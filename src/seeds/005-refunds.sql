INSERT INTO refunds (
    incident_id,
    refund_status
) VALUES
    (
        (SELECT incident_id FROM incidents WHERE description = 'Wrong product...'),
        'refunded'
    ),
    (
        (SELECT incident_id FROM incidents WHERE description = 'Happens in the delivery...'),
        'not_refunded'
    );