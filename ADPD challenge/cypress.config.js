const fs = require("fs");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Add a task to check if a file exists
      on("task", {
        fileExists(filePath) {
          return fs.existsSync(filePath);
        },
      });
    },
  },
};
