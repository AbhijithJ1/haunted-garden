/**
 * SoundEngine with piano/chime loops completely removed
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;
  private isMuted = true;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  public init() {
    this.initAudio();
  }

  public initAudio() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.65, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  // Piano / melody loop disabled permanently
  public playHorrorChime(_freq: number, _duration: number = 1.4, _volume: number = 0.25) {}

  public playThunderRumble() {}

  public playBloodImpact() {}

  public playSubPulse() {}

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playImpact() {}

  public playCardDraw() {}

  public setUniverseAtmosphere(_id?: string) {}

  public playUVToggle(_state?: boolean) {}

  public playWardClank() {}

  public playClickTongue() {}

  public playStinger(_id?: string) {}

  public playHeartbeat(_bpm?: number) {}

  public getAudioFrequencyData(): Uint8Array | null {
    if (!this.analyser) return null;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const soundEngine = new SoundEngine();
