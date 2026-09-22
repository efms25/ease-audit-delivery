CREATE INDEX IF NOT EXISTS idx_driver ON deliveries(driver_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON deliveries(created_at);
CREATE INDEX IF NOT EXISTS idx_client ON deliveries(client_id);
CREATE INDEX IF NOT EXISTS idx_status ON deliveries(status);