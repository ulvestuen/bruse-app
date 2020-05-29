# When docker image is built from this file, the image bundles the latest version of Node.js, which is available under
# a "MIT" license. For details, see https://github.com/nodejs/node/blob/master/LICENSE

# When docker image is built from this file, the image bundles a version of rollup, which is available under
# a "MIT" license. For details, see https://github.com/rollup/rollup/blob/master/LICENSE.md

# When docker image is built from this file, the image bundles a version of @rollup/plugin-commonjs,
# @rollup/plugin-node-resolve, @rollup/plugin-replace which are all available under
# a "MIT" license. For details, see https://github.com/rollup/plugins/blob/master/LICENSE

# When docker image is built from this file, the image bundles a version of rollup-plugin-livereload, which is available under
# a "MIT" license. For details, see https://github.com/thgh/rollup-plugin-livereload/blob/master/LICENSE.md

# When docker image is built from this file, the image bundles a version of rollup-plugin-svelte, which is available under
# a "MIT" license. For details, see https://github.com/sveltejs/rollup-plugin-svelte

# When docker image is built from this file, the image bundles a version of rollup-plugin-terser, which is available under
# a "MIT" license. For details, see https://github.com/TrySound/rollup-plugin-terser/blob/master/LICENSE

# When docker image is built from this file, the image bundles a version of svelte, which is available under
# a "MIT" license. For details, see https://github.com/sveltejs/svelte/blob/master/LICENSE

# When docker image is built from this file, the image bundles a version of sirv-cli, which is available under
# a "MIT" license. For details, see https://github.com/lukeed/sirv/blob/master/license

# When docker image is built from this file, the image bundles a version of mapbox-gl, which is available under
# a "3-Clause BSD" license. For details, see https://github.com/mapbox/mapbox-gl-js/blob/master/LICENSE.txt

# When docker image is built from this file, the image bundles a version of @material/icon-button, which is available under
# a "MIT" license. For details, see https://github.com/material-components/material-components-web/blob/master/LICENSE

# When docker image is built from this file, the image bundles a version of dompurify, which is available under
# a dual license of either "Apache License Version 2.0" or "Mozilla Public License Version 2.".
# For details, see https://github.com/cure53/DOMPurify/blob/master/LICENSE

FROM node:slim

RUN groupadd -g 999 bruse-app && \
    useradd -r -u 999 -g bruse-app bruse-app

ADD --chown=bruse-app:bruse-app ./ /home/bruse-app/
WORKDIR /home/bruse-app

USER bruse-app
EXPOSE 5000
ENTRYPOINT ["/bin/bash","entrypoint.sh"]
