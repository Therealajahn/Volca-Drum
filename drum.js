
// function startAudioContext(){    
//    document.querySelector('#play-button').addEventListener('click', async () =>{
//            await Tone.start()
//    })
// }

// startAudioContext();

class Sound {
    constructor(){
      this.gain = new Tone.Gain(0.4).toMaster(); 
      this.attack = 0;
      this.decay = 1;
      this.sustain = 0;
      this.release = 1; 
      this.ampEnv = new Tone.AmplitudeEnvelope({
        "attack" : this.attack,
        "decay": this.decay,
        "sustain": this.sustain,
        "release" : this.release,
        
      }).connect(this.gain);
      
      this.filter = new Tone.Filter({
        type : 'lowpass' ,
        frequency : 200 ,
        rolloff : -12 ,
        Q : 5,
        gain : 0
        }).connect(this.ampEnv);
      this.osc = new Tone.Oscillator(440, "sawtooth").connect(this.filter).start();
      this.signal = new Tone.Signal().connect(this.osc.frequency);
      this.mult = new Tone.Multiply(500).connect(this.osc.frequency);
      this.modGain = new Tone.Gain(1).connect(this.mult);
      this.mod = new  Tone.Oscillator(1000, "sine").connect(this.modGain).start();
      this.modEnv = new Tone.Envelope({
        "attack" : this.attack,
        "decay" : this.decay,
        "sustain" : this.sustain,
        "release" : this.release,
      }).connect(this.modGain);
      this.pitchEnv = new Tone.FrequencyEnvelope({
        "attack" : this.attack,
        "decay" : this.decay,
        "sustain" : this.sustain,
        "release" : this.release,
        "baseFrequency" : "100",
        "octaves": 2,
        "exponent" : 1,
      }).connect(this.osc.frequency); 
      
      
    }
}

const sound = new Sound;

const duration = .3;
sound.ampEnv.triggerAttackRelease(duration);
sound.ampEnv.attackCurve = "exponential";
sound.ampEnv.releaseCurve = "exponential";
sound.pitchEnv.attackCurve = "exponential";
sound.pitchEnv.releaseCurve = "exponential";
sound.pitchEnv.triggerAttackRelease(duration);
sound.modEnv.triggerAttackRelease(duration);



