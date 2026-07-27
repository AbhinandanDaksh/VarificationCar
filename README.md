# VarificationCar

Vehicle verification & inspection platform — microservices architecture.

## Architecture
Client → API Gateway (8080) → Auth/Vehicle/Inspection/Payment/Notification services → MySQL

## Tech Stack
- Backend: Node.js, Express 5, Sequelize, MySQL
- Frontend: React (Vite)
- Architecture: Modular microservices, shared DB

## Services & Ports
| Service | Port |
|---|---|
| API Gateway | 8080 |
| Auth | 5001 |
| Vehicles | 5002 |
| Inspections | 5003 |
| Payments | 5004 |
| Notifications | 5005 |
