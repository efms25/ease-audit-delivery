CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    vehicle: TEXT,
    license_plate: TEXT NOT NULL
);