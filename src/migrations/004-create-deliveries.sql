CREATE TABLE deliveries (
    delivery_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    driver_id INT,
    item_name TEXT NOT NULL,
    address TEXT NOT NULL,
    status delivery_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_delivery_client 
    FOREIGN KEY (client_id)
    REFERENCES clients(client_id),
    CONSTRAINT fk_delivery_driver
    FOREIGN KEY (driver_id)
    REFERENCES drivers(driver_id)
);