type SetVideoElementFn = (peerId: string, element: HTMLVideoElement | null) => void;
export type VideosProps = {
	clients: string[];
	setVideoElement: SetVideoElementFn;
};
