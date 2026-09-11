INSERT INTO (
    delivery_id,
    incident_time,
    description,
) VALUES 
    (
        (SELECT delivery_id FROM deliveries WHERE item_name = "Item A"),
        '2026-09-03 14:30:00',
        'Happens in the delivery...'
    ),
    (
        (SELECT delivery_id FROM deliveries WHERE item_name = "Item B"),
        '2026-09-08 12:10:00',
        'Can not deliver because...'
    ),
    (
        (SELECT delivery_id FROM deliveries WHERE item_name = "Item C"),
        '2026-09-10 16:15:00',
        'Wrong product...'
    );