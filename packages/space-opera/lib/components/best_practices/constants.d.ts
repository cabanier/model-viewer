/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
export declare const modelViewerTemplate = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <title>&lt;model-viewer&gt; template</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"description\" content=\"&lt;model-viewer&gt; template\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link type=\"text/css\" href=\"./styles.css\" rel=\"stylesheet\"/>\n  </head>\n  <body>\n    <!-- <model-viewer> HTML element -->\n    REPLACEME\n    <!-- Loads <model-viewer> for browsers: -->\n    <script type=\"module\" src=\"https://ajax.googleapis.com/ajax/libs/model-viewer/{{MODELVIEWER_VERSION}}/model-viewer.min.js\"></script>\n  </body>\n</html>";
export declare const scriptTemplate = "    <script src=\"script.js\"></script>";
export declare const progressBar = "// Handles loading the events for <model-viewer>'s slotted progress bar\nconst onProgress = (event) => {\n  const progressBar = event.target.querySelector('.progress-bar');\n  const updatingBar = event.target.querySelector('.update-bar');\n  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;\n  if (event.detail.totalProgress === 1) {\n    progressBar.classList.add('hide');\n    event.target.removeEventListener('progress', onProgress);\n  } else {\n    progressBar.classList.remove('hide');\n  }\n};\ndocument.querySelector('model-viewer').addEventListener('progress', onProgress);";
