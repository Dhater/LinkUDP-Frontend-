"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Calendar, Clock, MapPin, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TutoringDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Simulación de datos de tutoría
  const [tutoring] = useState({
    id: params.id,
    title: "Programación en Python",
    area: "Informática",
    description:
      "Aprende los fundamentos de la programación utilizando Python desde cero. Esta tutoría está diseñada para estudiantes sin experiencia previa en programación. Cubriremos variables, estructuras de control, funciones, y estructuras de datos básicas. También realizaremos ejercicios prácticos para reforzar los conceptos aprendidos.",
    schedule: "Martes 10:00-12:00",
    duration: "2 horas",
    location: "Laboratorio de Informática, Edificio A",
    tutor: {
      name: "Ana Gómez",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "Universidad Diego Portales",
      degree: "Ingeniería Informática",
      year: "5to año",
    },
  })

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-sky-700">Detalles de la Tutoría</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{tutoring.title}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="outline" className="bg-sky-50 text-sky-700">
                      {tutoring.area}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-medium text-sky-700">Descripción</h3>
                <p className="text-muted-foreground">{tutoring.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-sky-600" />
                  <div>
                    <p className="font-medium">Horario</p>
                    <p className="text-sm text-muted-foreground">{tutoring.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-sky-600" />
                  <div>
                    <p className="font-medium">Duración</p>
                    <p className="text-sm text-muted-foreground">{tutoring.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sky-600" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{tutoring.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-sky-600 hover:bg-sky-700" disabled>
                Contactar al Tutor
                <span className="ml-2 text-xs">(Próximamente)</span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información del Tutor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={tutoring.tutor.avatar || "/placeholder.svg"} alt={tutoring.tutor.name} />
                  <AvatarFallback>AG</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{tutoring.tutor.name}</p>
                  <p className="text-sm text-muted-foreground">{tutoring.tutor.degree}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-sky-600" />
                  <p className="text-sm text-muted-foreground">{tutoring.tutor.university}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-sky-600" />
                  <p className="text-sm text-muted-foreground">{tutoring.tutor.year}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>
                Ver Perfil Completo
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Calificaciones</CardTitle>
              <CardDescription>Esta función estará disponible próximamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <p>Las calificaciones y reseñas estarán disponibles en futuras actualizaciones.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
