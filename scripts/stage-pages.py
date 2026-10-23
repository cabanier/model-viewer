#!/usr/bin/env python3
"""Stage the local source and built site for a GitHub Pages project URL."""

import argparse
import json
import re
import shutil
import subprocess
from pathlib import Path
from urllib.parse import quote


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, required=True)
parser.add_argument('--output', type=Path, required=True)
parser.add_argument('--base-path', default='/model-viewer/')
args = parser.parse_args()
source = args.source.resolve()
output = args.output.resolve()
base = '/' + args.base_path.strip('/') + '/'
if source == output:
    raise SystemExit('The source and output must be different checkouts.')
branch = subprocess.check_output(
    ['git', '-C', str(output), 'branch', '--show-current'], text=True).strip()
if branch != 'gh-pages':
    raise SystemExit('The output must be a checkout of gh-pages.')


def copy(path, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    if path.is_dir():
        shutil.copytree(path, destination, dirs_exist_ok=True,
                        ignore=shutil.ignore_patterns('.git', '.DS_Store'))
    else:
        shutil.copy2(path, destination)


tracked = subprocess.check_output(
    ['git', '-C', str(source), 'ls-files', '-z']).decode().split('\0')
for name in filter(None, tracked):
    path = source / name
    if path.is_file():
        copy(path, output / name)

# Retain every workspace's local build beside its source, and include the
# browser distributions at the paths used by the documentation site.
workspaces = json.loads((source / 'package.json').read_text())['workspaces']
for workspace in workspaces:
    for directory in ['lib', 'dist', 'examples/built']:
        path = source / workspace / directory
        if path.is_dir():
            copy(path, output / workspace / directory)

docs = source / 'packages/modelviewer.dev'
site_directories = ['assets', 'data', 'docs', 'examples', 'lib', 'styles']
for name in ['index.html', 'ATTRIBUTIONS.md', *site_directories]:
    copy(docs / name, output / name)
for name in ['models', 'environments', 'icons']:
    copy(source / 'packages/shared-assets' / name,
         output / 'shared-assets' / name)
for package in ['model-viewer', 'model-viewer-effects']:
    copy(source / 'packages' / package / 'dist',
         output / 'node_modules/@google' / package / 'dist')
for package in ['js-beautify', 'web-animations-js']:
    copy(source / 'node_modules' / package, output / 'node_modules' / package)
copy(source / 'packages/space-opera/editor', output / 'editor')
copy(source / 'packages/space-opera/dist', output / 'dist')
copy(source / 'packages/render-fidelity-tools/dist', output / 'dist')
copy(docs / 'examples/fidelity.html', output / 'fidelity/index.html')

versions = {
    'MODELVIEWER_VERSION': json.loads(
        (source / 'packages/model-viewer/package.json').read_text())['version'],
    'THREEJS_VERSION': json.loads(
        (source / 'node_modules/three/package.json').read_text())['version'],
    'POSTPROCESSING_VERSION': json.loads(
        (source / 'node_modules/postprocessing/package.json').read_text())['version'],
}
folders = '|'.join([*site_directories, 'shared-assets', 'node_modules',
                    'dist', 'editor', 'fidelity'])
files = [output / 'index.html']
for directory in [*site_directories, 'editor', 'dist', 'fidelity']:
    files.extend((output / directory).rglob('*'))
patched = 0
for path in files:
    if not path.is_file() or path.suffix not in ['.html', '.js', '.json', '.css']:
        continue
    text = original = path.read_text()
    for name, value in versions.items():
        placeholder = '{{' + name + '}}'
        text = text.replace(placeholder, value).replace(quote(placeholder), value)
    # Always load the locally built component, including in embedded snippets.
    text = re.sub(
        r'https://ajax\.googleapis\.com/ajax/libs/model-viewer/[^/]+/',
        base + 'node_modules/@google/model-viewer/dist/', text)
    text = re.sub(
        r'https://(?:cdn\.jsdelivr\.net/npm|unpkg\.com)/'
        r'(@google/model-viewer(?:-effects)?)(?:@[^/]+)?/dist/',
        lambda match: base + 'node_modules/' + match[1] + '/dist/', text)
    text = text.replace('https://modelviewer.dev/', base)
    text = re.sub(r'(?:\.\./)+(' + folders + r')/',
                  lambda match: base + match[1] + '/', text)
    text = re.sub(r'(?<![A-Za-z0-9:/.])/(' + folders + r')/',
                  lambda match: base + match[1] + '/', text)
    if path.suffix == '.html':
        for name in ['model-viewer', 'model-viewer-module', 'model-viewer-effects']:
            text = text.replace(name + '.js', name + '.min.js')
    if text != original:
        path.write_text(text)
        patched += 1

(output / '.nojekyll').touch()
# This fork uses its github.io project URL, rather than the upstream domain.
(output / 'CNAME').unlink(missing_ok=True)
commit = subprocess.check_output(
    ['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
(output / 'BUILD_INFO.json').write_text(json.dumps({
    'sourceCommit': commit,
    'basePath': base,
    'versions': versions,
}, indent=2) + '\n')
(output / 'VERSION').write_text(commit + '\n')
print(f'Staged source {commit[:8]}, all workspace builds, and the static site.')
print(f'Updated {patched} site files for {base}.')
