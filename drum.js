
// function startAudioContext(){    
//    document.querySelector('#play-button').addEventListener('click', async () =>{
//            await Tone.start()
//    })
// }

// startAudioContext();

class Sound {
    constructor(){
      this.gain = new Tone.Gain(0.4).toMaster();  
      this.ampEnv = new Tone.AmplitudeEnvelope({
        "attack" : 0.01,
        "release" : 10,
        
      }).connect(this.gain);
      
      this.filter = new Tone.Filter({
        type : 'lowpass' ,
        frequency : 1000 ,
        rolloff : -12 ,
        Q : 5,
        gain : 0
        }).connect(this.ampEnv);
      this.osc = new Tone.Oscillator(440, "sawtooth").connect(this.filter).start();
      this.signal = new Tone.Signal().connect(this.osc.frequency);
      this.mult = new Tone.Multiply(10).connect(this.osc.frequency);
      this.modGain = new Tone.Gain(1).connect(this.mult);
      this.mod = new  Tone.Oscillator(800, "sine").connect(this.modGain).start();
      this.modEnv = new Tone.Envelope({
        "attack" : 0.01,
        "decay" : 0.01,
        "sustain" : 0.05,
        "release" : 1,
      }).connect(this.modGain);
      this.pitchEnv = new Tone.FrequencyEnvelope({
        "attack" : 0.01,
        "decay" : 0.01,
        "sustain" : 0.05,
        "release" : 1,
        "baseFrequency" : "C1",
        "octaves": 1,
        "exponent" : 1,
      }).connect(this.osc.frequency); 
      
      
    }
}

let sound = new Sound;

sound.ampEnv.triggerAttackRelease();
sound.ampEnv.attackCurve = "exponential";
sound.ampEnv.releaseCurve = "exponential";
sound.pitchEnv.attackCurve = "exponential";
sound.pitchEnv.releaseCurve = "exponential";
sound.pitchEnv.triggerAttackRelease();



