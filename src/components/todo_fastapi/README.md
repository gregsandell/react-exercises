# todo_fastapi

This is a React + OpenAPI application to satisfy the request given to me
for an interview with Fox Studios in December 2025.

> Please create a frontend application that uses an open API backend.
> Then we will ask for a change on the fly during the call.
> _(paraphrased)_

## Run the FastApi backend server

### Assumptions:  
* python is installed and available from terminal

## Build Instructions for the Terminal
1. In the `backend` folder: Create and activate a python environment, e.g. 
   * `python -m venv .venv` and 
   * `source .venv/bin/activate`
   * `uv sync`
1. Run `uvicorn app:app --reload`

## Prove successful run/build
> NOTE: **please use Safari** for the React app, as the _semantic-ui-react_ package is still buggy in Chrome.
1. Run the [To Do with FastAPI backend](http://localhost:3000/todofastapi) component in a Safari browser.
1. Also check that http://localhost:8000/docs loads, and shows the API
1. In the UI, test adding, removing and completing tasks
