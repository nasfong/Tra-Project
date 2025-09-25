#!/bin/sh

echo "Creating runtime env file..."

# Use default values if variables are not set
API_URL="${VITE_API_URL:-}"
IMAGE_URL="${VITE_IMAGE_URL:-}"

cat <<EOF > /usr/share/nginx/html/env.js
window.__ENV__ = {
  VITE_API_URL: "${API_URL}",
  VITE_IMAGE_URL: "${IMAGE_URL}",
};
EOF

# Verify the file was created correctly
if [ -f /usr/share/nginx/html/env.js ]; then
    echo "env.js created successfully:"
    cat /usr/share/nginx/html/env.js
else
    echo "ERROR: Failed to create env.js"
    exit 1
fi

echo "Starting Nginx..."
exec "$@"