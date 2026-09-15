CREATE TABLE IF NOT EXISTS refunds (
    refund_id SERIAL PRIMARY KEY,
    incident_id integer NOT NULL,
    refund_status refund_status DEFAULT 'in_process',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refunds_incidents
    FOREIGN KEY (incident_id)
    REFERENCES incidents(incident_id)
)