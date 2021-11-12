module.exports = {
    // resolves from test to snapshot path
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return testPath.replace('/dist-tests/', '/tests/') + snapshotExtension
    },

    // resolves from snapshot to test path
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        return snapshotFilePath.replace('/tests/', '/dist-tests/').slice(0, -snapshotExtension.length)
    },

    // Example test path, used for preflight consistency check of the implementation above
    testPathForConsistencyCheck: '/dist-tests/__tests__/example.test.js',
};
