CREATE TABLE incidents (
    incident_id SERIAL PRIMARY KEY,
    delivery_id INT NOT NULL,
    incident_time TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    outcome TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_incidents_delivery
    FOREIGN KEY (delivery_id)
    REFERENCES deliveries(delivery_id)
);