# Curation Labeling Interface

# Run

This React project is based on CRA. To run it locally, first set up the
environmental variables listed below in a `.env` file or in your local system.
Then, execute `npm install` and `npm start`.

## Environmental variables

**REACT_APP_API_ENDPOINT**

Endpoint to the application API, _e.g. http://localhost:3000/api_. Our project's
API is hosted in
[https://github.com/uic-evl/curation-backend](https://github.com/uic-evl/curation-backend).

**REACT_APP_CONTENT_ENDPOINT**

Endpoint for the image and PDF files.

**REACT_APP_AUTH_KEY**

Set up the authentication key for the token value in local storage; e.g.
`__curation_dev_auth_provider_token__`.

**REACT_APP_API_DEVELOPMENT_MODE**

Set _isolated_ to let MSW intercept all API calls and use the project mockups.
If so, use _http//localhost:3000/api_ as the endpoint. To use another endpoint,
use any other value.

# Development Notes

## MSW workarounds

For the development mockup environment, we read sample data from the json files
in `/src/mocks/data`. To simulate the CRUD operations, we use MSWJS/data library
which creates a database and provides related functions. As the library (or we
haven't figured it out yet) has some limitations when defining array type
attributes or nested object attributes (like in mongodb), we took some
workarounds:

- Array attributes like `task.assignedTo` are defined as a String of values
  separated by commas. The mockup function is responsible for the conversion of
  the values to an array when reading or back to a string when saving.
- To deal with the nested structure for the modality tree, we read it directly
  from the json file as it's inmutable for this release.
