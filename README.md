
# API Documentation

This API allows users to create questions, add options to a question, add votes to an option, and perform other related actions.

# Version 1

## Base URL

```
http://polingapi.socialise-india.in/api/v1/
```

## Authentication

#### Sign up

**Request:**
- Method: `POST`
- Endpoint: `/user/register`
- Content-Type: `application/json`
- Body:
  - `email` (string, required): Email to be registered.
  - `password` (string,required):Password associated.
  - `name` (string,optional):Name associated
  ### Example

```
POST /user/register

{
  "email": "example@example.com",
  "password": "password_dummy"
}
```

**Response:**
 - Status: 200 OK
 - Body: 
    - `message` (string) :Status message   
  
    
 ```
{
  "message": "User Succesfully Registered"
}
```
-------------------
####  Checks if Email is registered
Returns success or failure based on whether the email is unique and not already registered.

**Request:**
- Method: `POST`
- Endpoint: `/user/register`
- Content-Type: `application/json`
- Query Param:
  - `email` (string, required): Email to be checked

**Response**
- Body:
    - `message` : Status Message
  ### Example

```
GET user/is-unique?email=example@example.com

Query Params:
{
  "email": "example@example.com"
}
```
```Response Status: 409 CONFLICT```
Response Body:
```
{
    "message": "Email already taken"
}
```
```
GET user/is-unique?email=dummy@example.com

Query Params:
{
  "email": "dummy@example.com"
}
```
```Response Status: 200 OK```
Response Body:
```
{
    "message": "Email is Unique"
}
```
----------
## Login

Returns JSON web token if credentials match 
**Request**
- Method: `POST`
- Endpoint: `/user/create-session`
- Content-Type: `application/json`
- Body:
  - `email` (string, required): Email to be registered.
  - `password` (string,required):Password associated.
  ### Example



**Response**
- Body
    -`token`(string):JSON Web Token for authentication in protected routes
    
```

POST /user/create-session


{
  "email": "example@example.com",
  "password": "password_dummy"
}
```
```Resonse Status: 200 OK```
Response Body:
```
{
    "message": "Sign in successful.Token is attached",
    "data": {
        "token": "_JWT_"
    }
}
```
-------------------

### Create a Question

Create a new question.If options are passed along then options are created and associated
with the question.
This is a protected route and requires authenticaiton.Use the JWT as the value in the Authorization key in the headers as
'Bearer __ token __'
 
**Request:**

- Method: POST
- Endpoint: `/questions/create`
- Content-Type: application/json
- Body:
  - question (string, required): The text of the question
  - options ([string],optional): Arrays of options associated


**Example:**

```
POST /questions/create
```
Request Body:
{
  title:"Who is your favourite footballer"
  options:["CR7","LM10","SR4"]
}

`Status: 200 OK`

**Response**
```
{
    "message": "Question created",
    "data": {
        "question": {
            "title": "Who is your favourite footballer",
            "options": [
                {
                    "title": "CR7",
                    "question": "648b3d3c4d15c071f8a4fcb1",
                    "votes": 0,
                    "_id": "648b3d3c4d15c071f8a4fcb3",
                    "createdAt": "2023-06-15T16:33:00.983Z",
                    "updatedAt": "2023-06-15T16:33:00.983Z",
                    "__v": 0
                },
                {
                    "title": "LM",
                    "question": "648b3d3c4d15c071f8a4fcb1",
                    "votes": 0,
                    "_id": "648b3d3c4d15c071f8a4fcb6",
                    "createdAt": "2023-06-15T16:33:00.987Z",
                    "updatedAt": "2023-06-15T16:33:00.987Z",
                    "__v": 0
                }
            ],
            "user": "6479e28da7167541031f842a",
            "_id": "648b3d3c4d15c071f8a4fcb1",
            "createdAt": "2023-06-15T16:33:00.980Z",
            "updatedAt": "2023-06-15T16:33:00.980Z",
            "__v": 0
        }
    }
}
```

------

### Add Options to a Question

Add options to a specific question.Protected API.Needs JWT as Bearer token authentication


**Request:**

- Method: POST
- Endpoint: `/options/create/:id`
- Content-Type: application/json
- Params:
  - `id` (string, required): Id of the question to which the option is to be attached
- Body :
    - `title` (string,required):Text associated with the option

**Example:**

```
POST /options/create

Request Body:
{
  "option": "Pele"
}
```

**Response:**

 `Status: 200 OK`
**Example:**

```
Response Body:
{
    "message": "Option created",
    "data": {
        "question": {
            "_id": "648b3d3c4d15c071f8a4fcb1",
            "title": "Who is your favourite footballer",
            "options": [
                {
                    "_id": "648b3d3c4d15c071f8a4fcb3",
                    "title": "CR7",
                    "question": "648b3d3c4d15c071f8a4fcb1",
                    "votes": 0,
                    "createdAt": "2023-06-15T16:33:00.983Z",
                    "updatedAt": "2023-06-15T16:33:00.983Z",
                    "__v": 0
                },
                {
                    "_id": "648b3d3c4d15c071f8a4fcb6",
                    "title": "LM",
                    "question": "648b3d3c4d15c071f8a4fcb1",
                    "votes": 0,
                    "createdAt": "2023-06-15T16:33:00.987Z",
                    "updatedAt": "2023-06-15T16:33:00.987Z",
                    "__v": 0
                },
                {
                    "title": "'Saptarshi Gh' ",
                    "question": "648b3d3c4d15c071f8a4fcb1",
                    "votes": 0,
                    "_id": "648b5090ff6ec93f33101507",
                    "createdAt": "2023-06-15T17:55:28.414Z",
                    "updatedAt": "2023-06-15T17:55:28.414Z",
                    "__v": 0
                }
            ],
            "user": "6479e28da7167541031f842a",
            "createdAt": "2023-06-15T16:33:00.980Z",
            "updatedAt": "2023-06-15T16:33:00.992Z",
            "__v": 1
        },
        "option": {
            "title": "'Saptarshi Gh' ",
            "question": "648b3d3c4d15c071f8a4fcb1",
            "votes": 0,
            "_id": "648b5090ff6ec93f33101507",
            "createdAt": "2023-06-15T17:55:28.414Z",
            "updatedAt": "2023-06-15T17:55:28.414Z",
            "__v": 0
        }
    }
}
```

### Add a Vote to an Option

Add a vote to a specific option of a question.
Anonymous Voting is permitted

**Request:**

- Method: POST
- Endpoint: `/options/add-vote/:id`
- Param
    - option ID
**Example:**

```
POST /options/add-vote/saasfas8basd13kasd
```

**Response:**

`Status: 200 OK`
```
{
    "message": "Voted Successfully",
    "data": {
        "_id": "648b3d3c4d15c071f8a4fcb3",
        "title": "CR7",
        "question": "648b3d3c4d15c071f8a4fcb1",
        "votes": 1,
        "createdAt": "2023-06-15T16:33:00.983Z",
        "updatedAt": "2023-06-15T16:33:00.983Z",
        "__v": 0
    }
}
```
### Delete a Question

Delete a question. A question cannot be deleted if one of its options has votes.
Protected Route and only creater can delete the question.

**Request:**

- Method: DELETE
- Endpoint: `/questions/delete/:id`
- Params :
    - `id` (String): ID of the question to be delted

**Example:**

```
DELETE /questions/delete/124237t23234b
```

**Response:**

` Status: 200 OK`
```
 "message": "Question and associated options deleted successfully"
```

### Delete an Option

Delete an option. An option cannot be deleted if it has at least one vote.

**Request:**

- Method: DELETE
- Endpoint: `/options/delete/:id`
- Params:
        -  `id`:ID of the option be deleted

**Example:**

```
DELETE /options/delete/qwrnasd78asdlj9
```

**Response:**

` Status: 200 OK`
```
  message: "Option Deleted"
```

### View a Question with its Options and Votes

Retrieve a question with its associated options and votes.

**Request:**

- Method: GET
- Endpoint: `/questions/:id`
- Params :
    - `id` : ID of the question
**Example:**

```
GET /questions/asdjbasd083ala12
```

**Response:**

 `Status: 200 OK`

**Example:**

```
Response Body:
{
    {
    "message": "Question Found",
    "data": {
        "_id": "648b597d1f9b50a7e4dc4dce",
        "title": "Test Question",
        "options": [
            {
                "_id": "648b59ad1f9b50a7e4dc4dd2",
                "title": "test option 1  ",
                "question": "648b597d1f9b50a7e4dc4dce",
                "votes": 3,
                "createdAt": "2023-06-15T18:34:21.233Z",
                "updatedAt": "2023-06-15T18:34:21.233Z",
                "__v": 0
            },
            {
                "_id": "648b59ad189kasd8d2",
                "title": "test option 2  ",
                "question": "648b597d1f9b50a7e4dc4dce",
                "votes": 2,
                "createdAt": "2023-06-15T18:34:21.233Z",
                "updatedAt": "2023-06-15T18:34:21.233Z",
                "__v": 0
            }
        ],
        "user": {
            "_id": "648b59011f9b50a7e4dc4dbc",
            "email": "example@example.com",
            "name": "Anonymous",
            "password": "example",
            "votedQuestion": {},
            "createdAt": "2023-06-15T18:31:29.667Z",
            "updatedAt": "2023-06-15T18:31:29.667Z",
            "__v": 0
        },
        "createdAt": "2023-06-15T18:33:33.135Z",
        "updatedAt": "2023-06-15T18:34:21.238Z",
        "__v": 1
    }
}
}
```
------

## User Related

### Fetch polls user created
This is a protected route and requires valid JWT to return the polls a particular user created.
***Request***
- Method:GET
- `Endpoint:/user/mypolls`

### Fetch polls user voted
This is a protected route and requires valid JWT to return the polls a particular user voted.
***Request***
- Method:GET
- `Endpoint:/user/myvotes`
### Check if user has already voted for the question
This is a protected route and requires valid JWT to check if a user has already voted for a question.If yes return the option voted for.
***Request***
- Method:GET
- `Endpoint:/user/getChosenOption/:id`
- Params:
        - `id` : ID of the question for which the vote is checked
  




