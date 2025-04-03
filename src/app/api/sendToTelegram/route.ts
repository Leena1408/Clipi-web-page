import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json(); // Correct way to parse JSON
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Replace with your actual Telegram bot token and chat ID
    const TELEGRAM_BOT_TOKEN = "7654662769:AAEOIpHzkC6QObQpTLCV460NhPs143rOl28";
    const TELEGRAM_CHAT_ID = "5662220508";
    const message = `New Email Subscription: ${email}`;

    // Send message to Telegram
    const telegramURL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(telegramURL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
