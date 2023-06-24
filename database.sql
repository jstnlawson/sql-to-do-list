CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (500) NOT NULL,
	"date_created" DATE,
    "is_finished" BOOLEAN DEFAULT FALSE,
    "date_complete" DATE
);

INSERT INTO "todo" ("task", "date_created", "is_finished", "date_complete")
VALUES ('clean gutters', '2023-06-23', true, '2023-06-23');