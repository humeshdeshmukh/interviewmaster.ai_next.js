"use client";

import { useState } from 'react';
import { PageContainer, Card, Button } from '../../components/ui';
import { UserCog, Star, Calendar, Clock, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import ScheduleModal from './components/ScheduleModal';

interface Writer {
  id: string;
  name: string;
  title: string;
  experience: string;
  specialties: string[];
  rating: number;
  reviews: number;
  availability: 'Available' | 'Limited' | 'Busy';
  description: string;
  certifications: string[];
  languages: string[];
  packages: {
    [key: string]: {
      name: string;
      price: number;
      turnaround: string;
      isPopular: boolean;
    };
  };
}

const writers: Writer[] = [
  {
    id: 'w1',
    name: 'Sarah Johnson',
    title: 'Senior Resume Consultant',
    experience: '8+ years',
    specialties: ['Tech', 'Finance', 'Executive'],
    rating: 4.9,
    reviews: 324,
    availability: 'Available',
    description: 'Highly experienced resume consultant with a proven track record of success.',
    certifications: [
      'Certified Professional Resume Writer',
      'Certified Career Coach',
    ],
    languages: ['English', 'Spanish'],
    packages: {
      basic: {
        name: 'Basic',
        price: 99,
        turnaround: '3-5 business days',
        isPopular: false,
      },
      premium: {
        name: 'Premium',
        price: 199,
        turnaround: '1-3 business days',
        isPopular: true,
      },
      executive: {
        name: 'Executive',
        price: 299,
        turnaround: '1 business day',
        isPopular: false,
      },
    },
  },
  // Add more writers here
];

export default function ProfessionalWriterPage() {
  const [selectedWriter, setSelectedWriter] = useState<Writer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer
      badge={{
        icon: UserCog,
        text: "Professional Resume Writers"
      }}
      title={{
        main: "Work with",
        highlight: "Expert Writers",
        end: "for Your Resume"
      }}
      description="Get personalized guidance from certified professional resume writers"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writers.map((writer, index) => (
            <motion.div
              key={writer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{writer.name}</h3>
                    <p className="text-[#fcba28] text-sm">{writer.title}</p>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${writer.availability === 'Available' ? 'bg-green-500/20 text-green-500' :
                      writer.availability === 'Limited' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'}
                  `}>
                    {writer.availability}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#fcba28]" />
                    <span className="font-medium">{writer.rating}</span>
                    <span className="text-sm text-white/60">({writer.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#fcba28]" />
                    <span className="text-sm">{writer.experience}</span>
                  </div>
                </div>

                <p className="text-white/80 mb-4">{writer.description}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#fcba28]" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {writer.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#fcba28]" />
                      Certifications
                    </h4>
                    <ul className="space-y-1">
                      {writer.certifications.map((cert) => (
                        <li key={cert} className="text-sm text-white/60">
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      setSelectedWriter(writer);
                      setIsModalOpen(true);
                    }}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Consultation
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedWriter && (
        <ScheduleModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedWriter(null);
          }}
          writer={selectedWriter}
        />
      )}
    </PageContainer>
  );
}
