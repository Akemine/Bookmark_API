CREATE TYPE contenu AS ENUM ('video', 'photo');

CREATE TABLE public.media_content (
	id serial PRIMARY KEY,
	content_type contenu,
	url VARCHAR (255) UNIQUE NOT NULL,
	title VARCHAR (255) DEFAULT NULL,
	author_name VARCHAR (100),
    upload_date VARCHAR (30),
	publication_date VARCHAR (30),
	thumbnail_url VARCHAR (255),
	thumbnail_width INTEGER,
	thumbnail_height INTEGER,
	width INTEGER DEFAULT NULL,
	height INTEGER DEFAULT NULL,
	duration INTEGER DEFAULT NULL
);