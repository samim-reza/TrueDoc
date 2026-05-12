# TrueDoc

TrueDoc is a Django + React SaaS app for digital document attestation in Bangladesh.

In Bangladesh, citizens often need photocopies or scanned documents attested by authorized people such as teachers, government officers, or cadre officials. The same document may be required again and again for scholarships, bank accounts, admission, jobs, and office work. TrueDoc turns that repeated manual process into a one-time digital attestation: upload once, get verified by an accountable verifier, then share a permanent verification number and QR-backed record.

## Product Model

- **Citizen/User:** uploads a PDF, JPG, or PNG document and pays **BDT 20** per attestation request.
- **Verifier/Attestation Officer:** creates an account, submits identity/service proof, pays **BDT 100** activation, and attests or rejects assigned documents.
- **Organization/API Client:** verifies attested documents by number or API lookup for **BDT 2** per verification.
- **Admin:** approves verifier accounts, monitors fraud, handles disputes, and manages platform safety.

## Current MVP Flow

1. Register as a citizen, verifier, or organization.
2. Citizen uploads a document.
3. Citizen selects a verifier and requests attestation.
4. Verifier approves or rejects the request.
5. Approved documents receive a permanent `TD-YEAR-ID` verification number and generated QR image.
6. Anyone can verify the document publicly using the verification number.

## Implemented

- React landing page for TrueDoc’s SaaS concept.
- Login and registration with JWT authentication.
- Role-aware dashboard copy for citizens, verifiers, and organizations.
- Document upload API and frontend form.
- Document list dashboard connected to the Django API.
- Attestation request API.
- Verifier review actions: attest or reject.
- Public verification endpoint and verification page.
- Pricing page for the BDT 20 / BDT 100 / BDT 2 model.
- Django models for accounts, documents, attestations, and payments.

## Still Missing Before Production

- Real payment gateway integration such as bKash/Nagad/card.
- Admin approval workflow UI for verifier identity documents.
- Attested PDF stamping with QR code and verification number embedded into the downloadable file.
- Organization API key management, API credit billing, and rate limits.
- Fraud/dispute workflows and verifier fine management.
- Notification delivery through SMS/email.
- Strong production settings: environment variables, HTTPS, secure CORS, storage, logging, and backups.
- Automated tests for the full upload/request/attest/verify flow.

## Tech Stack

- **Backend:** Django, Django REST Framework, SimpleJWT
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Database:** SQLite for local development, PostgreSQL planned for deployment
- **Media:** Django local media storage in development
- **QR:** `qrcode` + Pillow

## Local Setup

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend API runs at:

```text
http://localhost:8000/api/
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173/
```

## Useful API Routes

- `POST /api/accounts/register/`
- `POST /api/accounts/login/`
- `GET /api/accounts/profile/`
- `GET /api/accounts/verifiers/`
- `GET /api/documents/`
- `POST /api/documents/`
- `GET /api/verification/attestations/`
- `POST /api/verification/attestations/`
- `POST /api/verification/attestations/{id}/attest/`
- `POST /api/verification/attestations/{id}/reject/`
- `GET /api/verification/public/{verification_number}/`

## Demo Notes

For a quick local demo:

1. Create a verifier account.
2. In Django admin, mark the verifier as approved if needed.
3. Create a citizen account.
4. Upload a document from the citizen dashboard.
5. Request attestation from the verifier.
6. Login as the verifier and attest the document.
7. Copy the generated verification number and test it at `/verify`.

## Docker

The project includes a `docker-compose.yml`, but the fastest current development path is the manual backend/frontend setup above. Before production deployment, review database, Redis, media storage, secrets, and HTTPS settings carefully.

## License

MIT
