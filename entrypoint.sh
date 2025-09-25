#!/bin/sh

echo "Creating runtime env file..."

cat <<EOF > /usr/share/nginx/html/env.js
window.__ENV__ = {
  VITE_API_URL: "${VITE_API_URL}",
  VITE_IMAGE_URL: "${VITE_IMAGE_URL}",
};
EOF

echo "Starting Nginx..."
exec "$@"
