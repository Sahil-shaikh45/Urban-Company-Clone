-- Database creation
CREATE DATABASE IF NOT EXISTS urban_company;
USE urban_company;

-- Drop tables if they exist (to allow re-running the script)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS section_services;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100),
    color VARCHAR(20)
);

-- Offers Table
CREATE TABLE offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500)
);

-- Services Table
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    rating DECIMAL(3, 2),
    price DECIMAL(10, 2),
    reviews VARCHAR(50),
    image_url VARCHAR(500),
    is_most_booked BOOLEAN DEFAULT FALSE
);

-- Sections Table
CREATE TABLE sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- Section Services (Mapping many-to-many or many-to-one)
CREATE TABLE section_services (
    section_id INT,
    service_id INT,
    PRIMARY KEY (section_id, service_id),
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Providers Table
CREATE TABLE providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    status ENUM('ONLINE', 'OFFLINE', 'BUSY') DEFAULT 'OFFLINE',
    rating DECIMAL(3, 2) DEFAULT 0,
    version INT DEFAULT 0
);

-- Bookings Table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    service_id INT,
    provider_id INT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED') DEFAULT 'PENDING',
    price DECIMAL(10, 2),
    distance DECIMAL(5, 2),
    otp VARCHAR(6),
    version INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (provider_id) REFERENCES providers(id)
);

-- Insert Categories
INSERT INTO categories (name, icon, color) VALUES
('Women''s Salon', 'bi-person-heart', '#f43f5e'),
('Men''s Salon', 'bi-person-standing', '#6366f1'),
('Cleaning', 'bi-bucket', '#10b981'),
('AC Repair', 'bi-snow', '#0ea5e9'),
('Electrician', 'bi-lightning-charge', '#f59e0b'),
('Plumber', 'bi-droplet', '#3b82f6'),
('Painting', 'bi-paint-bucket', '#8b5cf6');

-- Insert Offers
INSERT INTO offers (title, description, image_url) VALUES
('Flat ₹100 Off', 'On first cleaning service', 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&w=800&q=80'),
('30% Discount', 'On AC servicing combo', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'),
('Special Package', 'Salon at home for women', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'),
('Home Deep Clean', 'Starting at ₹1999', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'),
('Men''s Grooming', 'Flat 20% off on haircuts', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'),
('Pest Control', 'Get free inspection today', 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&w=800&q=80'),
('Kitchen Sparkle', 'Combo at just ₹999', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'),
('Spa Day', 'Buy 1 Get 1 Free massage', 'https://images.unsplash.com/photo-1544161515-4af6b1d46152?auto=format&fit=crop&w=800&q=80');

-- Insert Most Booked Services
INSERT INTO services (id, title, rating, price, reviews, image_url, is_most_booked) VALUES
(101, 'AC Service (Filter Cleaning)', 4.8, 599, '2.5M', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', TRUE),
(102, 'Sofa Cleaning', 4.9, 999, '1.2M', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', TRUE),
(103, 'Electrician Visit', 4.7, 149, '5.8M', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', TRUE),
(104, 'Haircut for Men', 4.8, 299, '3.1M', 'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&w=600&q=80', TRUE);

-- Insert Other Services and Sections
INSERT INTO sections (id, title) VALUES (1, 'Cleaning Essentials');
INSERT INTO services (id, title, rating, price, image_url) VALUES
(201, 'Bathroom Cleaning', 4.8, 399, 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80'),
(202, 'Kitchen Cleaning', 4.7, 799, 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80'),
(203, 'Full Home Deep Cleaning', 4.9, 2499, 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80'),
(204, 'Carpet Cleaning', 4.6, 499, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80'),
(205, 'Curtain Cleaning', 4.5, 299, 'https://images.unsplash.com/photo-1513694490325-244a2255847b?auto=format&fit=crop&w=600&q=80');
INSERT INTO section_services (section_id, service_id) VALUES (1, 201), (1, 202), (1, 203), (1, 204), (1, 205);

INSERT INTO sections (id, title) VALUES (2, 'Appliance Repair');
INSERT INTO services (id, title, rating, price, image_url) VALUES
(301, 'Washing Machine Repair', 4.8, 199, 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80'),
(302, 'Refrigerator Repair', 4.7, 249, 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&w=600&q=80'),
(303, 'Microwave Repair', 4.6, 199, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80'),
(304, 'RO Water Purifier Service', 4.9, 499, 'https://images.unsplash.com/photo-1585829365291-17d2393f37b5?auto=format&fit=crop&w=600&q=80'),
(305, 'Geyser Repair', 4.7, 299, 'https://images.unsplash.com/photo-1585136641360-3b503ca263c8?auto=format&fit=crop&w=600&q=80');
INSERT INTO section_services (section_id, service_id) VALUES (2, 301), (2, 302), (2, 303), (2, 304), (2, 305);

INSERT INTO sections (id, title) VALUES (3, 'Home Repair & Installation');
INSERT INTO services (id, title, rating, price, image_url) VALUES
(401, 'Drill & Hang (Wall Decor)', 4.9, 99, 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=600&q=80'),
(402, 'Fan Repair', 4.7, 149, 'https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?auto=format&fit=crop&w=600&q=80'),
(403, 'Door Lock Repair', 4.8, 199, 'https://5.imimg.com/data5/SELLER/Default/2023/11/357899799/WW/OI/XC/15518016/door-lock-repairing-1000x1000.jpeg'),
(404, 'Switchboard Repair', 4.7, 129, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'),
(405, 'Tap/Mixer Leakage Repair', 4.8, 149, 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80');
INSERT INTO section_services (section_id, service_id) VALUES (3, 401), (3, 402), (3, 403), (3, 404), (3, 405);

INSERT INTO sections (id, title) VALUES (4, 'Massage Services');
INSERT INTO services (id, title, rating, price, image_url) VALUES
(501, 'Stress Relief Massage', 4.9, 1299, 'https://www.swedishinstitute.edu/app/uploads/2023/11/DSC_2937-1-768x512.jpg-2.webp'),
(502, 'Pain Relief Therapy', 4.8, 1499, 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80'),
(503, 'Deep Tissue Massage', 4.9, 1699, 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80'),
(504, 'Foot Massage', 4.7, 599, 'https://images.unsplash.com/photo-1519824141121-b97674372073?auto=format&fit=crop&w=600&q=80'),
(505, 'Head & Shoulder Massage', 4.8, 499, 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80');
INSERT INTO section_services (section_id, service_id) VALUES (4, 501), (4, 502), (4, 503), (4, 504), (4, 505);

INSERT INTO sections (id, title) VALUES (5, 'Salon Services');
INSERT INTO services (id, title, rating, price, image_url) VALUES
(601, 'Haircut & Beard Style', 4.8, 499, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'),
(602, 'Facial for Glow', 4.7, 899, 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'),
(603, 'Pedicure & Manicure', 4.9, 1199, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80'),
(604, 'Waxing (Arms & Legs)', 4.8, 699, 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80'),
(605, 'Full Body Polishing', 4.9, 2499, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80');
INSERT INTO section_services (section_id, service_id) VALUES (5, 601), (5, 602), (5, 603), (5, 604), (5, 605);
