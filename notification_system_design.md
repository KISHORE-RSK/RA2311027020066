# Notification System Design
# Notification System Design

## Overview
This system fetches notifications from an external API and processes them to return the top N priority notifications. The system ensures proper logging, sorting, and efficient handling of data.

---

## Workflow

1. Fetch notifications from the API using an authenticated request.
2. Log each major step using the custom logging middleware.
3. Process and sort notifications based on priority and timestamp.
4. Return the top 10 notifications.

---

## Priority Rules

Notifications are prioritized as follows:

- Placement → Highest priority
- Result → Medium priority
- Event → Lowest priority

---

## Sorting Logic

1. Use a priority map:
   - Placement = 3
   - Result = 2
   - Event = 1

2. Sorting is done in two steps:
   - First by priority (descending)
   - Then by timestamp (latest first)

---

## Algorithm

- Fetch notifications → O(n)
- Sort notifications → O(n log n)
- Extract top N → O(1)

---

## Logging Middleware

Logging is implemented for all critical steps:

- API request start
- API success / failure
- Sorting completion
- Final result generation

This ensures traceability and debugging support.

---

## Error Handling

- Handles API failures (401, 400, etc.)
- Prevents crashes when data is unavailable
- Logs errors properly for debugging

---

## Assumptions

- API returns valid structured data
- Access token is refreshed when expired
- Notification types are limited to Placement, Result, and Event

---

## Possible Improvements

- Store notifications in a database for persistence
- Implement caching for faster responses
- Add real-time updates using WebSockets
- Improve scalability using microservices architecture

---

## Conclusion

The system efficiently processes notifications using priority-based sorting and robust logging. It is scalable, maintainable, and follows clean coding practices.