INSERT INTO deliveries (
    client_id,
    driver_id,
    item_name,
    address
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
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-4@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0004'),
        'Item F',
        'street B, distrit 4 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-5@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0006'),
        'Item G',
        'street C, distrit 5 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-6@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0007'),
        'Item H',
        'street D, distrit 6 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-7@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0001'),
        'Item I',
        'street E, distrit 7 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-8@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0003'),
        'Item J',
        'street F, distrit 8 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-9@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0005'),
        'Item K',
        'street G, distrit 9 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-10@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0002'),
        'Item L',
        'street H, distrit 10 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-11@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0004'),
        'Item M',
        'street I, distrit 11 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-12@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0006'),
        'Item N',
        'street J, distrit 12 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-13@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0007'),
        'Item O',
        'street K, distrit 13 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-14@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0001'),
        'Item P',
        'street L, distrit 14 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-15@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0003'),
        'Item Q',
        'street M, distrit 15 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-16@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0005'),
        'Item R',
        'street N, distrit 16 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-17@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0002'),
        'Item S',
        'street O, distrit 17 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-18@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0004'),
        'Item T',
        'street P, distrit 18 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-19@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0006'),
        'Item U',
        'street Q, distrit 19 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-20@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0007'),
        'Item V',
        'street R, distrit 20 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-21@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0001'),
        'Item W',
        'street S, distrit 21 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-22@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0003'),
        'Item X',
        'street T, distrit 22 - state'
    ),
    (
        (SELECT client_id FROM clients WHERE email = 'client-23@mail.com'),
        (SELECT driver_id FROM drivers WHERE license_plate = 'PLC-0005'),
        'Item Y',
        'street U, distrit 23 - state'
    );
