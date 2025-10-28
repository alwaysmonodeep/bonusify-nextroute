
import { supabase } from '@/lib/superbase';
function TestButton() {
  const testWhatsAppOTP = async () => {
    try {
      console.log("Testing from React app...");
      
      const { data, error } = await supabase.functions.invoke("clever-responder", {
        body: {
          phone: "918250749095",
          otp: "123456"
        }
      });

      if (error) {
        console.error("❌ Error:", error);
        alert(`Error: ${JSON.stringify(error, null, 2)}`);
      } else {
        console.log("✅ Success:", data);
        alert(`Success!\n\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      console.error("❌ Exception:", err);
      alert(`Exception: ${err.message}`);
    }
  };

  return (
    <button onClick={testWhatsAppOTP}>
      Test WhatsApp OTP
    </button>
  );
}

export default TestButton;