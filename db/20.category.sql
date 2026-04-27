
CREATE TABLE public.category (
    id bigint NOT NULL,
    name character varying(150) NOT NULL,
    description character varying(500),
    slug character varying(150) NOT NULL UNIQUE,
    deleted boolean DEFAULT false,
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone,
    PRIMARY KEY(id)
);


ALTER TABLE public.category OWNER TO postgres;


CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;


ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


INSERT INTO public.category (id, name, description, slug) VALUES
(1, 'Quesos', 'Selección de quesos artesanales españoles de máxima calidad', 'quesos'),
(2, 'Embutidos Ibéricos', 'Los mejores embutidos ibéricos de bellota y cebo de campo', 'embutidos-ibericos'),
(3, 'Aceites y Conservas', 'Aceites de oliva virgen extra y conservas artesanas de primera calidad', 'aceites-y-conservas'),
(4, 'Vinos y Licores', 'Vinos de denominación de origen y licores tradicionales españoles', 'vinos-y-licores'),
(5, 'Dulces y Turrones', 'Dulces tradicionales, turrones artesanos y mazapanes selectos', 'dulces-y-turrones'),
(6, 'Cestas Gourmet', 'Cestas y lotes gourmet con los mejores productos seleccionados', 'cestas-gourmet');


SELECT pg_catalog.setval('public.category_id_seq', 7);
