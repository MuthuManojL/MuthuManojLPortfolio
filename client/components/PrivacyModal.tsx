import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PrivacyModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal only once per session if user hasn't seen it
    const hasSeenPrivacyNotice = sessionStorage.getItem("privacy-notice-seen");
    if (!hasSeenPrivacyNotice) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("privacy-notice-seen", "true");
      }, 2000); // Show after 2 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Privacy & Analytics</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-foreground">
            This portfolio respects your privacy. We use privacy-forward analytics
            that are cookie-less and respect your browser's "Do Not Track" setting.
          </p>

          <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">What we collect:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Anonymous page views (no personal data)</li>
              <li>Interaction patterns (clicks, scrolls)</li>
              <li>Device type and basic browser info</li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground">
            You can opt-in or out of analytics anytime in the footer.
          </p>
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Got it
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem("analytics-opt-in", "true");
              setIsOpen(false);
            }}
            className="flex-1"
          >
            Enable Analytics
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
