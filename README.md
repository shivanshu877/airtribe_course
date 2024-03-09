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
    "name": "c++ 100 days course",
    "max_seats": "50",
    "start_date": "04-04-2024",
    "instructor_id": "1"
  }
  ```
  


### Update Course

Updates an existing course with the provided details.

- **Endpoint**: `/api/course/update`
- **Method**: PUT
- **Body**:
```json
{
  "id": "1",
  "max_seats": "1",
  "start_date": "04-04-2024"
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
  "name": "shivanshu",
  "email": "vashudev8777@gmail.com",
  "phone_number": "8901036109",
  "linkedin_profile": "www.linkedin.com/shivanshu",
  "course_id": "4"
}
```


## Update Lead Status

### Updates the status of a lead.

- **Endpoint**: `/api/lead/update`
- **Method**: PUT
- **Body**:
```json
{
  "lead_id": "6",
  "status": "Accept"
}
```

## Search Lead

### Searches for leads by name or email.

- **Endpoint**: `/api/lead/search`
- **Method**: GET
- **Body**:
```json
{
  "name": "Bob Smith",
  "email": "vashudev8777@gmail.com"
}
```

## Add Comment to Lead

### Adds a comment to a lead.

- **Endpoint**: `/api/lead/comment`
- **Method**: POST
- **Body**:
```json
{
  "lead_id": "1",
  "instructor_id": "1",
  "content": "welcome to the course"
}
```
