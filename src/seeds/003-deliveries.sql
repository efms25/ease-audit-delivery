INSERT INTO deliveries (
    client_id,
    driver_id,
    item_name,
    address,
) VALUES
    (
        (SELECT client_id FROM clients WHERE email = 'client-1@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0001'),
        'Item A',
        'street A, distrit 11 - state'
    ),
    
    (
        (SELECT client_id FROM clients WHERE email = 'client-3@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0005'),
        'Item B',
        'street Z, distrit 32 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-2@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0002'),
        'Item C',
        'street X, distrit 22 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-1@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0003'),
        'Item D',
        'street Y, distrit 1 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-1@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0002'),
        'Item E',
        'street Y, distrit 1 - state'
    );
