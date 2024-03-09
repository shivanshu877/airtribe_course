# Airtribe Courses Server

## Description

This repository contains the server code for the Airtribe courses application.

## Setup

To spin up the environment, follow these steps:

1. Build the Docker image:

   ```bash
   docker build -t airtribe_courses_server .
   ```

2. Run the Docker container:

   ```bash
   docker-compose up
   ```

This will start the server and any associated services specified in the `docker-compose.yml` file.

## Usage

Once the environment is up and running, you can access the server at [http://localhost:3000](http://localhost:3000).

# pgadmin4

you can access the pdadmin at [http://localhost:5050](http://localhost:5050)

- **username**:`admin@admin.com`
- **password**:`admin`
# Postgressql 

you can access postgresql database through pgadmin using the following credationals:
- **host**:`db`
- **username**:`postgres`
- **password**:`postgres`
- **database**:`postgres`

# Database ERD

![Screenshot](screenshot.png)


# API Documentation

This document provides information about the APIs available in this application.

## Setup

This application uses a setup API to create tables and add dummy data from a backup file.

- **Endpoint**: `/setup`
- **Method**: POST
- **Description**: Initializes the database by creating tables and populating them with dummy data from a backup file.
- **Body**: No body required.

# Postman Collection

To test the APIs, you can import the following Postman collection:

<!-- Start of "Run in Postman" Button -->

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/20448680-fd83e78b-7b1e-4520-9d25-156193b32310?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20448680-fd83e78b-7b1e-4520-9d25-156193b32310%26entityType%3Dcollection%26workspaceId%3D401fc04a-5924-4338-b601-95ccd22e7893)

<!-- End of "Run in Postman" Button -->

You can click the "Run in Postman" button above to directly import the collection into your Postman app.

## Course API

### Create Course

Creates a new course with the provided details.

- **Endpoint**: `/api/course/create`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "string",
    "max_seats": "int",
    "start_date": "mm-dd-yyyy",
    "instructor_id": "int"
  }
  ```

### Update Course

Updates an existing course with the provided details.

- **Endpoint**: `/api/course/update`
- **Method**: PUT
- **Body**:

```json
{
  "id": "int",
  "name": "string[optional]",
  "max_seats": "int[optional]",
  "start_date": "mm-dd-yyyy[optional]"
}
```

## Lead API

### Register Lead

Registers a new lead for a course.

- **Endpoint**: `/api/course/registration`
- **Method**: POST
- **Body**:

```json
{
  "name": "string",
  "email": "string",
  "phone_number": "string",
  "linkedin_profile": "string",
  "course_id": "int"
}
```

## Update Lead Status

### Updates the status of a lead.

- **Endpoint**: `/api/lead/update`
- **Method**: PUT
- **Body**:

```json
{
  "lead_id": "int",
  "status": "string"
}
```

## Search Lead

### Searches for leads by name or email.

- **Endpoint**: `/api/lead/search`
- **Method**: GET
- **Body**:

```json
{
  "name": "string[optional]",
  "email": "string[optional]"
}
```

## Add Comment to Lead

### Adds a comment to a lead.

- **Endpoint**: `/api/lead/comment`
- **Method**: POST
- **Body**:

```json
{
  "lead_id": "int",
  "instructor_id": "int",
  "content": "int"
}
```
