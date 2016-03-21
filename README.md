This is a repo to provide a test case to demonstrate that Nock's `delayBody` function results in different behaviour compared to running against an actual HTTP server compared to `Nock`.

To run the test case, run `npm test`. An exit code of 0 indicates that Nock behaves identically to an actual http server, 1 indicates that `request` running against an actual http server didn't fail as expected, and 2 indicates that `request` running against `nock` didn't fail as expected.
