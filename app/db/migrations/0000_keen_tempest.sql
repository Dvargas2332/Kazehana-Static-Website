CREATE TABLE `leads` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`kind` enum('demo','waitlist','whatsapp') NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(320),
	`phone` varchar(40),
	`property_name` varchar(160),
	`rooms` int,
	`message` text,
	`consent` boolean NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
