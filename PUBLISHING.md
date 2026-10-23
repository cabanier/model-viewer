# GitHub Pages testing snapshot

This branch contains the complete local source snapshot, all workspace builds,
and the documentation site at the repository root. `BUILD_INFO.json` records
the source commit and dependency versions used to build it.

The published pages use the local model-viewer bundles, including native
`<model>` rendering, rather than the released bundles on a CDN.

## Publish

From the main checkout:

```sh
git push -u origin gh-pages
```

In GitHub, open **Settings → Pages**, select **Deploy from a branch**, then
choose **gh-pages** and **/ (root)**.

Test these pages after deployment:

- https://cabanier.github.io/model-viewer/
- https://cabanier.github.io/model-viewer/examples/native/

## Refresh from local source

The publishing checkout is at `dist/gh-pages` in the main repository. Run these
commands from the main checkout to rebuild and stage another snapshot:

```sh
npm run build
python3 dist/gh-pages/scripts/stage-pages.py --source . --output dist/gh-pages --base-path /model-viewer/
git -C dist/gh-pages add -f .
git -C dist/gh-pages commit -m "Update GitHub Pages testing snapshot"
git push origin gh-pages
```
