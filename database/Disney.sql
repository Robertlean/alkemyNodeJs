--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-11-26 20:24:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 245795)
-- Name: genders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genders (
    id integer NOT NULL,
    name character varying NOT NULL,
    image character varying
);


ALTER TABLE public.genders OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 245793)
-- Name: Genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Genre_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Genre_id_seq" OWNER TO postgres;

--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 204
-- Name: Genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Genre_id_seq" OWNED BY public.genders.id;


--
-- TOC entry 203 (class 1259 OID 245784)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    image character varying NOT NULL,
    title character varying NOT NULL,
    "creationDate" date NOT NULL,
    rating integer NOT NULL,
    "genderId" integer NOT NULL
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 245782)
-- Name: Movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Movie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Movie_id_seq" OWNER TO postgres;

--
-- TOC entry 3046 (class 0 OID 0)
-- Dependencies: 202
-- Name: Movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Movie_id_seq" OWNED BY public.movies.id;


--
-- TOC entry 201 (class 1259 OID 245773)
-- Name: characters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characters (
    id integer NOT NULL,
    image character varying,
    name character varying,
    age integer,
    weight numeric,
    history character varying
);


ALTER TABLE public.characters OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 245771)
-- Name: character_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.character_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.character_id_seq OWNER TO postgres;

--
-- TOC entry 3047 (class 0 OID 0)
-- Dependencies: 200
-- Name: character_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.character_id_seq OWNED BY public.characters.id;


--
-- TOC entry 207 (class 1259 OID 245806)
-- Name: charactersmovies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.charactersmovies (
    id integer NOT NULL,
    "characterId" integer NOT NULL,
    "movieId" integer NOT NULL
);


ALTER TABLE public.charactersmovies OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 245804)
-- Name: charactersmovies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.charactersmovies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.charactersmovies_id_seq OWNER TO postgres;

--
-- TOC entry 3048 (class 0 OID 0)
-- Dependencies: 206
-- Name: charactersmovies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.charactersmovies_id_seq OWNED BY public.charactersmovies.id;


--
-- TOC entry 209 (class 1259 OID 245814)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    password character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 245812)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3049 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2878 (class 2604 OID 245776)
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters ALTER COLUMN id SET DEFAULT nextval('public.character_id_seq'::regclass);


--
-- TOC entry 2881 (class 2604 OID 245809)
-- Name: charactersmovies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.charactersmovies ALTER COLUMN id SET DEFAULT nextval('public.charactersmovies_id_seq'::regclass);


--
-- TOC entry 2880 (class 2604 OID 245798)
-- Name: genders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genders ALTER COLUMN id SET DEFAULT nextval('public."Genre_id_seq"'::regclass);


--
-- TOC entry 2879 (class 2604 OID 245787)
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public."Movie_id_seq"'::regclass);


--
-- TOC entry 2882 (class 2604 OID 245817)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3031 (class 0 OID 245773)
-- Dependencies: 201
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.characters (id, image, name, age, weight, history) FROM stdin;
1	Belle_transparent.png	Bella	17	60	Bella es un personaje ficticio en la película animada de Disney, La Bella y la Bestia y sus dos secuelas, La Bella y la Bestia: Una Navidad Encantada y sus varios spin-offs, incluyendo El Mundo Mágico de Bella. Forma parte de la franquicia de las Princesas Disney.
2	Blancanieve1.jpg	BlancaNieves	14	56	Blancanieves es el primer y más joven miembro de las Princesas Disney. Su personaje proporcionó la base para heroínas posteriores en los cuentos de hadas de Disney como Cenicienta y Aurora. Muchos de los rasgos de Blancanieves -como su linaje real, su relación amistosa con los animales y su propensión a cantar- continúan inspirando a héroes y heroínas en las animaciones de Disney hasta el día de hoy.
3	Stitch.png	Stitch	19	25	El Experimento 626 es considerado un villano en su primera película. Fue creado por el Doctor Jumba, un genio malvado que crea mutaciones genéticas prohibidas.\n\nEl Experimento 626 llega a la Tierra, donde le llevan a la perrera. Allí es adoptado por Lilo, que le ayuda a convertirse en bueno.\n\nComo Jumba no consigue atraparlo, la Gran Consejera le dice al Capitán Gantu que vaya en su búsqueda. Gantu consigue atrapar a Stitch, y también captura a Lilo. Stitch logra escapar, pero Lilo sigue atrapada y, con la ayuda de Nani, la hermana mayor de Lilo, y la de Jumba y Pleakley, Stitch se dispone a rescatar a su amiga.\n\nDespués de rescatarla la nave aterriza, y en la playa de la isla está la Gran Consejera, que captura al Experimento 626. Entonces, Lilo le dice que Stitch es de su propiedad porque lo adoptó en la perrera. La Gran Consejera lo comprende y le dice a Lilo que puede hacerse cargo de Stitch, que se pone muy contento de tener una familia.
4	Beast_pose.jpg	Bestia	23	85	La Bestia es un personaje ficticio que aparece por primera vez en el 30.º largometraje animado de Walt Disney Animation Studios titulado Beauty and the Beast (1991). Basado en el héroe del cuento de hadas francés de Jeanne-Marie Leprince de Beaumont, la Bestia 
5	FaMulan.png	Mulan	16	58	Mulan es atípica a los anteriores papeles femeninos en las películas Disney. Es una joven bella, valiente, autosuficiente, y no se centra en el matrimonio. Asimismo, no se ajusta a las expectativas de una muchacha china de la época: elegante, discreta, y tranquila. En lugar de eso, es torpe,franca e independiente. Al comienzo de la primera película, le es difícil adaptarse, pensando que nunca va a traer honor a su familia. Como sigue la historia, empieza a ganar más confianza en sí misma y, después de salvar a China, por fin se ve a sí misma como la persona que ella siempre quiso ser y el honor que ha traído a su familia.
\.


--
-- TOC entry 3037 (class 0 OID 245806)
-- Dependencies: 207
-- Data for Name: charactersmovies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.charactersmovies (id, "characterId", "movieId") FROM stdin;
1	1	1
5	5	4
2	2	2
3	3	3
4	4	1
\.


--
-- TOC entry 3035 (class 0 OID 245795)
-- Dependencies: 205
-- Data for Name: genders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genders (id, name, image) FROM stdin;
1	romance	romance.png
2	aventura	adventure.jpg
3	ficcion	fiction.png
4	accion	action.png
\.


--
-- TOC entry 3033 (class 0 OID 245784)
-- Dependencies: 203
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, image, title, "creationDate", rating, "genderId") FROM stdin;
1	la bella y la bestia.jpg	La Bella y la Bestia	1992-07-09	4	1
2	lilo.jpg	Lilo y Stich	2002-07-06	3	2
3	blananieves y los 7 enanitos.jpg	Blancanieves y los 7 enanitos	1938-01-26	4	2
4	mulan.jpg	Mulan	1998-06-05	4	4
\.


--
-- TOC entry 3039 (class 0 OID 245814)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password) FROM stdin;
1	robertoveintemilla@gmail.com	pruebaalkemy
2	person@alkemy.com	personalkemy
\.


--
-- TOC entry 3050 (class 0 OID 0)
-- Dependencies: 204
-- Name: Genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Genre_id_seq"', 1, false);


--
-- TOC entry 3051 (class 0 OID 0)
-- Dependencies: 202
-- Name: Movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movie_id_seq"', 1, false);


--
-- TOC entry 3052 (class 0 OID 0)
-- Dependencies: 200
-- Name: character_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.character_id_seq', 1, false);


--
-- TOC entry 3053 (class 0 OID 0)
-- Dependencies: 206
-- Name: charactersmovies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.charactersmovies_id_seq', 1, false);


--
-- TOC entry 3054 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 2888 (class 2606 OID 245803)
-- Name: genders Genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genders
    ADD CONSTRAINT "Genre_pkey" PRIMARY KEY (id);


--
-- TOC entry 2886 (class 2606 OID 245792)
-- Name: movies Movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "Movie_pkey" PRIMARY KEY (id);


--
-- TOC entry 2884 (class 2606 OID 245781)
-- Name: characters character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT character_pkey PRIMARY KEY (id);


--
-- TOC entry 2890 (class 2606 OID 245830)
-- Name: charactersmovies charactersmovies_characterId_movieId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.charactersmovies
    ADD CONSTRAINT "charactersmovies_characterId_movieId_key" UNIQUE ("characterId", "movieId");


--
-- TOC entry 2892 (class 2606 OID 245826)
-- Name: charactersmovies charactersmovies_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.charactersmovies
    ADD CONSTRAINT charactersmovies_id_key UNIQUE (id);


--
-- TOC entry 2894 (class 2606 OID 245811)
-- Name: charactersmovies charactersmovies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.charactersmovies
    ADD CONSTRAINT charactersmovies_pkey PRIMARY KEY (id);


--
-- TOC entry 2896 (class 2606 OID 245822)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2898 (class 2606 OID 245833)
-- Name: charactersmovies charactersmovies_characterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.charactersmovies
    ADD CONSTRAINT "charactersmovies_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES public.characters(id) NOT VALID;


--
-- TOC entry 2899 (class 2606 OID 245838)
-- Name: charactersmovies charactersmovies_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.charactersmovies
    ADD CONSTRAINT "charactersmovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) NOT VALID;


--
-- TOC entry 2897 (class 2606 OID 245843)
-- Name: movies movies_genderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "movies_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES public.genders(id) NOT VALID;


-- Completed on 2021-11-26 20:24:50

--
-- PostgreSQL database dump complete
--

