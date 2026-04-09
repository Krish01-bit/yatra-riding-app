# Yatra – Driver First Ride Sharing App

Yatra is a **driver-centric ride sharing prototype** designed to improve fairness, transparency, and safety in ride-hailing platforms.

Unlike traditional ride apps that prioritize passengers, Yatra focuses on **driver income protection, safety monitoring, and smart demand visibility**.

The project demonstrates how technology can create a **balanced and ethical ride ecosystem** for Indian cities.

---

# Problem Statement

Current ride-sharing platforms often overlook the challenges faced by drivers.

Key problems include:

- Drivers traveling long pickup distances **without compensation**
- **Unfair ride cancellations** causing income loss
- No **driver rating transparency** before booking
- Lack of **real-time emergency safety features**
- **Driver fatigue and stress** not considered in ride allocation

These issues create an **imbalanced ride ecosystem** where drivers bear most of the operational burden.

Yatra addresses these problems with a **driver-first ride sharing model**.

---

# Proposed Solution

Yatra introduces a ride-sharing platform that improves the driver ecosystem through:

- Fair compensation mechanisms
- Transparent ride booking
- Safety monitoring systems
- Driver wellness features
- Smart demand visualization

The system aims to **build trust between drivers and passengers while improving overall ride efficiency**.

---

# Key Features

### Driver Rating Visibility
Passengers can see **driver ratings before booking**, improving transparency and trust.

### First Ride Pickup Compensation
Drivers receive compensation when traveling **more than 1 km for pickup** during their first ride.

### Cancellation Compensation
Drivers are compensated if a passenger cancels after the driver starts traveling toward pickup.

### SOS Emergency System
Passengers can trigger an **SOS button** that shares live location and trip details for safety.

### Driver Wellness Mode
Drivers can enable **Low Energy Mode**, limiting rides to short distances without affecting ratings.

### Demand Heatmap
Drivers can see **high demand zones** on the map to position themselves strategically.

---

# Screenshots

## Live Map & Demand Heatmap

![Live Map](assets/screenshots/map.png)

Displays live driver locations and demand zones to guide driver positioning.

---

## Ride Monitoring & Fare Breakdown

![Ride Interface](assets/screenshots/rider.png)

Shows active ride status, SOS emergency option, and fare calculation including pickup compensation.

---

## Driver Dashboard

![Driver Dashboard](assets/screenshots/driver.png)

Drivers can:

- Accept ride requests
- Monitor earnings
- Enable wellness mode
- View ride statistics

---

# Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Mapping & Visualization
- Leaflet.js
- OpenStreetMap

### Development Tools
- Vite
- GitHub

### Core Logic
- Rule-based fare calculation
- Pickup compensation logic
- Cancellation compensation system
- Demand heatmap simulation

---

# System Architecture


User Interface (React + Tailwind)
↓
Application Logic
↓
Map Integration (Leaflet + OpenStreetMap)
↓
Ride Fare & Compensation Engine


This architecture enables the system to manage **ride flow, driver locations, and fare rules efficiently**.

---

# Current Limitations

Since this is a prototype, some limitations exist:

- GPS accuracy depends on device location services
- Heatmap currently uses **simulated demand data**
- Compensation logic needs safeguards to **prevent misuse**
- Real-time backend ride matching is not fully implemented

These limitations can be addressed with **backend infrastructure and AI models**.

---

# Future Scope

Potential improvements include:

- AI-based demand prediction
- Traffic-aware route optimization
- Automated emergency alert integration
- Driver mental health analytics
- Fully scalable ride-matching backend
- Real-time fleet management

These upgrades can transform Yatra into a **production-ready ride platform**.

---

# Team – Lag Busters

### Krish Agarwal
 https://www.linkedin.com/in/krish-agarwal-44745033b

### Sumeshe B
 https://www.linkedin.com/in/sumeshe-b-8981a5375/

### Manogar G
 https://www.linkedin.com/in/manogar-g-598ba3368/

### Hari Saran
 https://www.linkedin.com/in/hari-saran-99564a39a/

---

# How to Run the Project

### 1️.Clone the repository
git clone https://github.com/Krish01-bit/yatra-riding-app
### 2.Navigate to the project folder
cd yatra-riding-app
### 3.Install dependencies
npm install
### 4.Start the development server
npm run dev

The application will run locally in your browser.

# Conclusion

Yatra demonstrates how ride-sharing systems can be redesigned to prioritize driver fairness, passenger safety, and platform transparency.

By introducing compensation models, wellness features, and safety tools, the platform promotes a more ethical and sustainable mobility ecosystem.

This prototype provides a strong foundation for building next-generation ride-sharing solutions for Indian cities.
