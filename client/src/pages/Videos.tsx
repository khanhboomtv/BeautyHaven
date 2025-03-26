import { VideoCard } from "@/components/VideoCard";
import { useQuery } from "@tanstack/react-query";
import { type Video } from "@shared/schema";

export default function Videos() {
    const { data: videos } = useQuery<Video[]>({
        queryKey: ["/api/videos"]
    });

    return (
        <div className="container mx-auto px-4 py-16 mt-20 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos?.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}
