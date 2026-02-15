'use client'

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
export default function TemperatureSelector(){
    
  const [temperature, setTemperature] = useState(0.7);

    return(
        <>
             <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-stone-900">
                    Temperature
                  </label>
                  <span className="text-sm font-medium text-stone-600">
                    {temperature.toFixed(2)}
                  </span>
                </div>
        
                <Slider
                  value={[temperature]}
                  onValueChange={(val) => setTemperature(val[0])}
                  min={0}
                  max={1}
                  step={0.05}
                  className="w-full"
                />
        
                <div className="flex justify-between text-xs text-stone-500 font-medium">
                  <span>0 (Precise)</span>
                  <span>1 (Creative)</span>
                </div>
              </div>
        
        </>
    )
}