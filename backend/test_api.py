import unittest
import urllib.request
import json

BASE_URL = "http://127.0.0.1:8000/api"

class TestPetrailsAPI(unittest.TestCase):
    def test_01_health_check(self):
        with urllib.request.urlopen(f"{BASE_URL}/health") as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertEqual(data["status"], "healthy")
            self.assertIn("database", data)

    def test_02_database_status(self):
        with urllib.request.urlopen(f"{BASE_URL}/database/status") as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertIn("connected", data)
            self.assertIn("status", data)

    def test_03_auth_login(self):
        payload = json.dumps({"email": "sarah.jenkins@petrails.insure"}).encode()
        req = urllib.request.Request(f"{BASE_URL}/auth/login", data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertIn("token", data)
            self.assertEqual(data["user"]["fullName"], "Sarah Jenkins")

    def test_04_get_assessments(self):
        with urllib.request.urlopen(f"{BASE_URL}/assessments") as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertIsInstance(data, list)
            self.assertGreater(len(data), 0)

    def test_05_get_claims(self):
        with urllib.request.urlopen(f"{BASE_URL}/claims") as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertIsInstance(data, list)
            self.assertGreater(len(data), 0)

    def test_06_get_pets(self):
        with urllib.request.urlopen(f"{BASE_URL}/pets") as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertIsInstance(data, list)
            self.assertGreater(len(data), 0)

    def test_07_portfolio_analytics(self):
        with urllib.request.urlopen(f"{BASE_URL}/analytics/portfolio") as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertIn("totalApplications", data)
            self.assertIn("riskDistribution", data)

    def test_08_assessment_decision_persistence(self):
        payload = json.dumps({
            "decision": "Approve",
            "notes": "Verified comprehensive underwriting test decision",
            "user": "Sarah Jenkins"
        }).encode()
        req = urllib.request.Request(
            f"{BASE_URL}/assessments/asm-1/decision",
            data=payload,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req) as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode())
            self.assertTrue(data["success"])

        # Verify persistence on read
        with urllib.request.urlopen(f"{BASE_URL}/assessments/asm-1") as resp:
            asm = json.loads(resp.read().decode())
            self.assertEqual(asm["status"], "Approved")

if __name__ == "__main__":
    unittest.main()

