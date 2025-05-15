import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Search, History } from "lucide-react"

export default function StudentDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-sky-600">LINKUDP</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/tutoring" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Buscar Tutorías
            </Link>
            <Link href="/dashboard/student" className="text-sm font-medium text-foreground">
              Mi Dashboard
            </Link>
            <Link href="/profile/student" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Mi Perfil
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-10 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-sky-700">Dashboard de Estudiante</h1>
              <p className="text-muted-foreground">Bienvenido, Juan Pérez</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/tutoring">
                <Button className="bg-sky-600 hover:bg-sky-700">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar Tutorías
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="upcoming" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="upcoming">Próximas Tutorías</TabsTrigger>
              <TabsTrigger value="recommended">Recomendados</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              {upcomingTutorings.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingTutorings.map((tutoring) => (
                    <Card key={tutoring.id} className="h-full overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">{tutoring.title}</CardTitle>
                          <Badge variant="outline" className="bg-sky-50 text-sky-700">
                            {tutoring.area}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1 text-xs">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback>{tutoring.tutor.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {tutoring.tutor}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-sky-600" />
                            <span>{tutoring.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-sky-600" />
                            <span>{tutoring.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-sky-600" />
                            <span>{tutoring.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/tutoring/${tutoring.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            Ver detalles
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-medium">No tienes tutorías programadas</h3>
                    <p className="mb-4 text-muted-foreground">
                      Busca tutorías disponibles y agenda una sesión con un tutor
                    </p>
                    <Link href="/tutoring">
                      <Button className="bg-sky-600 hover:bg-sky-700">Buscar Tutorías</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="recommended" className="mt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedTutorings.map((tutoring) => (
                  <Link href={`/tutoring/${tutoring.id}`} key={tutoring.id}>
                    <Card className="h-full overflow-hidden transition-all hover:border-sky-300 hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium">{tutoring.title}</CardTitle>
                          <Badge variant="outline" className="bg-sky-50 text-sky-700">
                            {tutoring.area}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-muted-foreground">
                          Tutor: {tutoring.tutor}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{tutoring.description}</p>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/50 px-4 py-2">
                        <div className="flex w-full justify-between text-xs text-muted-foreground">
                          <span>Horario: {tutoring.schedule}</span>
                          <span>Duración: {tutoring.duration}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <History className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-medium">No tienes historial de tutorías</h3>
                  <p className="mb-4 text-muted-foreground">
                    Tu historial de tutorías aparecerá aquí una vez que hayas completado alguna sesión
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tus áreas de interés</CardTitle>
                <CardDescription>Materias en las que estás buscando ayuda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200">Matemáticas</Badge>
                  <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200">Física</Badge>
                  <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200">Programación</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/profile/student">
                  <Button variant="outline" size="sm">
                    Editar intereses
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>¿Quieres ser tutor?</CardTitle>
                <CardDescription>Comparte tus conocimientos y ayuda a otros estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Como tutor, podrás crear tutorías, establecer tu disponibilidad y ayudar a otros estudiantes en las
                  materias que dominas.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/profile/convert-to-tutor">
                  <Button className="bg-sky-600 hover:bg-sky-700">Convertirme en tutor</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 LINKUDP. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

const upcomingTutorings = [
  {
    id: "1",
    title: "Cálculo Diferencial",
    area: "Matemáticas",
    tutor: "Carlos Mendoza",
    date: "15 de Mayo, 2025",
    time: "15:00 - 17:00",
    location: "Biblioteca Central",
  },
]

const recommendedTutorings = [
  {
    id: "2",
    title: "Programación en Python",
    area: "Informática",
    tutor: "Ana Gómez",
    description: "Aprende los fundamentos de la programación utilizando Python desde cero.",
    schedule: "Martes 10:00-12:00",
    duration: "2 horas",
  },
  {
    id: "3",
    title: "Física Mecánica",
    area: "Física",
    tutor: "Roberto Sánchez",
    description: "Refuerza tus conocimientos en física mecánica y prepárate para tus exámenes.",
    schedule: "Jueves 14:00-16:00",
    duration: "2 horas",
  },
  {
    id: "4",
    title: "Estadística Aplicada",
    area: "Matemáticas",
    tutor: "Laura Martínez",
    description: "Tutoría especializada en estadística aplicada para estudiantes de ciencias sociales.",
    schedule: "Viernes 16:00-18:00",
    duration: "2 horas",
  },
]
