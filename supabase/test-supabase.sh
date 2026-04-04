#!/bin/bash

# Test Supabase connectivity from the landing page form

echo "🔍 Testing Supabase Integration..."
echo ""

URL="${1:-https://go.synapsea.com.br}"
echo "Testing URL: $URL"
echo ""

# Check if form fields are present in HTML
echo "1️⃣  Checking for form fields..."
curl -s --resolve go.synapsea.com.br:443:127.0.0.1 https://go.synapsea.com.br/ 2>/dev/null | grep -q "Falar com um arquiteto" && echo "✅ Form button found" || echo "❌ Form button NOT found"

# Check if Supabase URL is in bundle
echo "2️⃣  Checking for Supabase integration in bundle..."
curl -s --resolve go.synapsea.com.br:443:127.0.0.1 https://go.synapsea.com.br/ 2>/dev/null | grep -q "dcmuhhnpdhzsfnaislzm.supabase.co" && echo "✅ Supabase URL detected" || echo "⚠️  Supabase URL not visible in HTML (normal if in bundle)"

# Try to submit a test lead
echo "3️⃣  Attempting form submission..."
echo "   (Note: This will create a test lead in Supabase)"
echo "   Skipping automated test - manually test the form instead"

echo ""
echo "📋 Manual Test Steps:"
echo "1. Open https://go.synapsea.com.br"
echo "2. Scroll to 'Conversa com um arquiteto' section"
echo "3. Fill the form with test data:"
echo "   - Name: Test Lead"
echo "   - Email: test@example.com"
echo "   - Company: Test Inc"
echo "   - Country: Brasil (🇧🇷 +55)"
echo "   - WhatsApp: 11999999999"
echo "   - Problem: Test description"
echo "4. Click 'Falar com um arquiteto'"
echo "5. Check Supabase Dashboard → Table Editor → leads"
echo ""
echo "✅ If lead appears in Supabase, integration is working!"
