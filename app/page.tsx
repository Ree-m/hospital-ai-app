import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Activity, Mic, ChevronRight } from "lucide-react";
import Link from "next/link";

const HospitalAIWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="mb-8 flex items-center gap-2">
        <Activity className="h-8 w-8 text-blue-600" strokeWidth={2} />
        <h1 className="text-2xl font-bold text-slate-900">HospitalAI</h1>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to HospitalAI
          </CardTitle>
          <CardDescription className="text-center text-slate-500">
            Select an application to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 flex flex-col gap-4">
          <Link href="/image-analyser">
            <Button
              variant="outline"
              className="w-full justify-between py-6 text-left h-auto cursor-pointer"
              size="lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Wound Analyser</div>
                  <div className="text-sm text-slate-500">
                    AI-powered wound assessment
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </Button>
          </Link>
          <Link href="/voice">
            <Button
              variant="outline"
              className="w-full justify-between py-6 text-left h-auto cursor-pointer"
              size="lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Mic className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Voice to Notes</div>
                  <div className="text-sm text-slate-500">
                    Transcribe medical dictations
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </Button>
          </Link>
        </CardContent>

        <CardFooter className="flex justify-center pt-2 pb-6">
          <p className="text-xs text-grey-600">
            © 2025 HospitalAI. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HospitalAIWelcome;
