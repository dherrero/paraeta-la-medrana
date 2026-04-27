
CREATE TABLE public.product (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    stock integer NOT NULL DEFAULT 0,
    image_url character varying(500),
    category_id bigint NOT NULL,
    active boolean NOT NULL DEFAULT true,
    deleted boolean DEFAULT false,
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone,
    PRIMARY KEY(id),
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE RESTRICT
);


ALTER TABLE public.product OWNER TO postgres;


CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO postgres;


ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


CREATE INDEX idx_product_category_id ON public.product(category_id);
CREATE INDEX idx_product_active_deleted ON public.product(active, deleted) WHERE deleted = false;


INSERT INTO public.product (id, name, description, price, stock, category_id) VALUES
(1,  'Queso Manchego Curado D.O.P.', 'Queso manchego curado de leche de oveja con denominación de origen, mínimo 6 meses de maduración', 18.50, 40, 1),
(2,  'Queso Cabrales Azul D.O.P.', 'Queso azul asturiano elaborado con mezcla de leche de vaca, oveja y cabra, madurado en cuevas naturales', 14.90, 25, 1),
(3,  'Jamón Ibérico de Bellota 50% Ibérico', 'Jamón ibérico de bellota con crianza en dehesa, loncheado al momento y envasado al vacío (100g)', 12.75, 60, 2),
(4,  'Chorizo Ibérico de Bellota Extra', 'Chorizo elaborado con carne de cerdo ibérico de bellota, pimentón de La Vera y especias naturales (250g)', 9.20, 80, 2),
(5,  'Aceite de Oliva Virgen Extra Picual', 'Aceite de oliva virgen extra de variedad picual, primera cosecha en frío, botella 500ml', 11.30, 100, 3),
(6,  'Anchoas del Cantábrico en Aceite de Oliva', 'Filetes de anchoa del Cantábrico conservados en aceite de oliva virgen extra, lata 50g', 7.80, 70, 3),
(7,  'Ribera del Duero Reserva 2019', 'Vino tinto Ribera del Duero Reserva elaborado con uva Tempranillo, 14 meses en barrica de roble francés', 22.50, 50, 4),
(8,  'Orujo de Galicia Herbas', 'Licor de hierbas gallego elaborado con orujo de albariño y plantas aromáticas silvestres, botella 700ml', 17.60, 35, 4),
(9,  'Turrón de Jijona Artesano Supremo', 'Turrón blando de almendra marcona molida con miel de romero, elaboración artesana, tableta 300g', 13.40, 90, 5),
(10, 'Mazapán de Toledo Figuritas Surtidas', 'Surtido de figuritas de mazapán toledano elaborado con almendra y azúcar, estuche 200g', 8.95, 110, 5),
(11, 'Cesta Gourmet Ibérica Premium', 'Cesta con jamón ibérico, chorizo, queso manchego, aceite de oliva virgen extra y vino tinto Reserva', 89.00, 15, 6),
(12, 'Lote Navideño Sabores de España', 'Lote con turrones surtidos, mazapán, membrillo, conservas de anchoa y licor de hierbas', 64.50, 20, 6);


SELECT pg_catalog.setval('public.product_id_seq', 13);
