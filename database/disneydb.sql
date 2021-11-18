-- Database: Disney

-- DROP DATABASE "Disney";

CREATE DATABASE "Disney"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Argentina.1252'
    LC_CTYPE = 'Spanish_Argentina.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.characters

-- DROP TABLE public.characters;

CREATE TABLE public.characters
(
    id integer NOT NULL DEFAULT nextval('character_id_seq'::regclass),
    image character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default",
    age integer,
    weight numeric,
    history character varying COLLATE pg_catalog."default",
    CONSTRAINT character_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.characters
    OWNER to postgres;

TABLESPACE pg_default;

   -- Table: public.movies

-- DROP TABLE public.movies;

CREATE TABLE public.movies
(
    id integer NOT NULL DEFAULT nextval('"Movie_id_seq"'::regclass),
    image character varying COLLATE pg_catalog."default" NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    "creationDate" date NOT NULL,
    rating integer NOT NULL,
    "genderId" integer NOT NULL,
    CONSTRAINT "Movie_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.movies
    OWNER to postgres;


-- Table: public.genders

-- DROP TABLE public.genders;

CREATE TABLE public.genders
(
    id integer NOT NULL DEFAULT nextval('"Genre_id_seq"'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default",
    CONSTRAINT "Genre_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.genders
    OWNER to postgres;

