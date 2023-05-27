import { useRef, useEffect } from 'react';
import styles from './Room.module.scss';

export const Room = () => {
  const localVideo = useRef<HTMLVideoElement | null>(null);

  const getLocalStream = async () => {
    try {
      const streem = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });

      if (localVideo.current) {
        localVideo.current.srcObject = streem;
        localVideo.current.onloadeddata = () => localVideo.current?.play();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getLocalStream();
  }, []);

  return (
    <div className={styles.room}>
      <div className={styles.clients}>
        <div className={styles.client}>{/* <video ref={localVideo} /> */}</div>

        <div className={styles.client}></div>
        <div className={styles.client}></div>
        <div className={styles.client}></div>
        <div className={styles.client}></div>
        <div className={styles.client}></div>
        <div className={styles.client}></div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panel__buttons}>
          <button className={styles.panel__end}>end call</button>
        </div>
      </div>
    </div>
  );
};
