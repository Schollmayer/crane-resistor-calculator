// Imports
import { findCR700, findCDBR } from "../CR700_calculator/hoist_data.js";

export class HoistAlternative {
    constructor() {
        this.voltageClass = 400;            // Drive voltage class
        this.brakeActivateVoltage = 788;    // Braking transistor activation voltage (DC)
        this.g_const = 9.81                 //g in m/s**2

        //Main hoist data


        // Get hoist speed in meters per minute. Range [1 - 50] m/min
        this.v_hoist = parseFloat(document.getElementById("hoistLinSpeedInput").value);
        // Motor target speed in rpm
        this.n_motor = parseFloat(document.getElementById("avMotorSpeedInput").value);
        // Motor target speed in rpm
        this.n_motor_start = parseFloat(document.getElementById("motorStartSpeedInput").value);
        // Save working load in kg (mass) and convert to grams
        this.m_L = parseFloat(document.getElementById("WorkingLoadInput").value) * 1000;
        // Chain weight in kg (mass) and convert to grams
        this.m_C = parseFloat(document.getElementById("ChainWeightInput").value) * 1000;
        // Mass total load
        this.m_L_total = this.m_L + this.m_C;
        // Rope groove diameter in m
        this.d_r = parseFloat(document.getElementById("groveDiameterInput").value);
        // Height of lift 
        this.h_lift = parseFloat(document.getElementById("hoistHeigthInput").value);
        // Gearbox ratio 
        this.i_gear = 1 / parseFloat(document.getElementById("GearboxRatioInput").value);
        // Pulley block ratio
        this.i_pulley = 1 / parseFloat(document.getElementById("PulleyBlockRatioInput").value);

        // Main hoist motor data
        // Motor power in kW
        this.P_m = parseFloat(document.getElementById("avMotorPowerInput").value) * 1000;
        // Get motor rated current in Ampere. Range [1 - 2000] A
        this.I_motor = parseFloat(document.getElementById("motorRatedCurrentInput").value);
        // Motor speed
        this.n_motor = parseFloat(document.getElementById("avMotorSpeedInput").value);
        // Motor inertia
        this.I_inertia_motor = parseFloat(document.getElementById("MotorInertiaInput").value);
        // Get motor efficiency in percent. Range [70-100] %
        this.η_motor = parseFloat(document.getElementById("motorEffInput").value) / 100;
        // Get gearbox efficiency in percent. Range [70-100] %
        this.η_gearbox = parseFloat(document.getElementById("gearboxEffInput").value) / 100;
        // Get pulley efficiency in percent. Range [70-100] %
        this.η_pulley = parseFloat(document.getElementById("pulleyEffInput").value) / 100;
        // Duty cycle efficiency (assuming it's already in the correct format)
        this.η_dutyCycle = parseFloat(document.getElementById("ed%Input").value);



        //Calculated values

        //Total moment of inertia
        this.I_total = this.I_inertia_motor + ((this.m_C + this.m_L) * ((this.d_r / 2) ** 2) * (this.i_gear ** 2) * (this.i_pulley ** 2));

        //Load torque on motor shaft
        this.M_load = this.m_L_total * this.g_const * (this.d_r / 2) * this.i_gear * this.i_pulley;

        //Maximum breaking torque
        //TODO Check n2 and 0.5, there is no 0.5 present to get result from example
        this.M_B_max = ((this.I_total * (this.n_motor - this.n_motor_start)) / (60 / (2 * Math.PI))) + this.M_load;

        //Maximum braking power
        this.P_B_max = ((this.M_B_max * this.n_motor) / (60 / (2 * Math.PI)));

        //Maximum electrical braking power in kW
        this.P_El_max = (this.P_B_max - ((1 - this.η_motor) * this.P_m) - (((1 - this.η_gearbox) * (1 - this.η_pulley)) * this.P_B_max)) / 1000;

        //Maximum braking resistance
        this.R_max = (this.brakeActivateVoltage ** 2) / (this.P_El_max * 1000);

        //Maximum brake time
        this.t_brake_max = Math.round((this.h_lift / this.v_hoist) * 60);

        //Power while lowering
        this.P_low = (this.M_load * this.n_motor) / (60 / (2 * Math.PI));

        //Power while lowering - losses can be used as average electrical braking power in kW
        this.P_El_avg = (this.P_low - ((1 - this.η_motor) * this.P_m) - ((1 - this.η_gearbox) * this.P_low) - ((1 - this.η_pulley) * this.P_low)) / 1000;
    }

    selectedCDBR() {
        return findCDBR(this.R_max, this.t_brake_max, this.brakeActivateVoltage, this.η_dutyCycle);
    }
    selectedCR700() {
        return findCR700(this.I_motor, this.P_El_avg, this.R_max, this.t_brake_max, this.η_dutyCycle);
    }
}