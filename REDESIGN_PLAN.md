# Plan de Rediseño - Fundación Cuidamos con Amor

## Objetivo
Adaptar el proyecto actual (Next.js + GSAP + CSS Modules) al estilo visual de la web de referencia (Canva), manteniendo la superioridad técnica.

---

## Paleta de Colores (Referencia)

| Uso | Color | HEX |
|-----|-------|-----|
| **Primario** | Teal | `#0C7B93` |
| **Secundario** | Lila/Lavanda | `#B8A9C9` |
| **Acento** | Lila claro | `#D4C5E2` |
| **Fondo claro** | Blanco roto | `#F8F6F4` |
| **Texto principal** | Gris oscuro | `#333333` |
| **Texto secundario** | Gris medio | `#666666` |
| **Fondo hero** | Teal degradado | `#0C7B93` → `#0A6578` |

---

## Estructura de Componentes (Nuevo Orden)

```
1. TopBar          ← NUEVO: "Bogotá, Colombia" + iconos + "Dona aquí"
2. Navbar          ← MODIFICADO: Simplificar, sin glassmorphism
3. Hero            ← MODIFICADO: Logo circular + texto lado a lado
4. SobreNosotros   ← NUEVO: Equipo con fotos y descripción
5. NuestroTrabajo  ← NUEVO: 3 pilares (Nutrición, Recreativo, Psicosocial)
6. Impacto         ← MODIFICADO: Estadísticas con iconos
7. Datos           ← MODIFICADO: 8 porcentajes limpios
8. ComoApoyarnos   ← MODIFICADO: 3 tarjetas de donación
9. Donaciones      ← NUEVO: CTA de donación
10. Empresa        ← MODIFICADO: Beneficios para empresas
11. Galeria        ← MODIFICADO: Grid limpio de imágenes
12. Contacto       ← MODIFICADO: Contacto limpio
13. Aliados        ← SIN CAMBIOS
14. Footer         ← MODIFICADO: Estilo limpio
15. DonationModal  ← SIN CAMBIOS (funcional)
16. BackToTop      ← SIN CAMBIOS
```

---

## Cambios por Archivo

### 1. `app/globals.css`
- Actualizar variables CSS con nueva paleta
- Eliminar tokens de glassmorphism
- Agregar variable `--color-lavender`
- Mantener utilidades de contenedor y tipografía

### 2. `app/page.tsx`
- Agregar import de `TopBar`, `SobreNosotros`, `NuestroTrabajo`, `Donaciones`
- Reordenar componentes según nueva estructura

### 3. `app/components/TopBar/` (NUEVO)
- Barra superior con "Bogotá, Colombia"
- Iconos de email e Instagram (lucide-react)
- Botón "Dona aquí" con enlace a Google Forms
- Estilo: fondo lila claro, texto teal

### 4. `app/components/Navbar/Navbar.tsx` + `.module.css`
- Eliminar gradiente de fondo, usar fondo blanco
- Logo a la izquierda, enlaces al centro, "Dona aquí" a la derecha
- Simplificar hover states
- Eliminar glassmorphism

### 5. `app/components/Hero/Hero.tsx` + `.module.css`
- Layout de dos columnas: Logo circular izquierda, texto derecha
- Fondo teal sólido (sin imagen de fondo)
- Logo circular con borde blanco y texto curvo
- Texto: "Bienvenid@" + "CUIDAMOS CON AMOR" + "y alimentamos la esperanza"
- Eliminar overlay y gradientes

### 6. `app/components/SobreNosotros/` (NUEVO)
- Título: "Sobre Nosotras"
- Subtítulo: "Unidas por la esperanza"
- Texto descriptivo del grupo
- Grid de 7 miembros del equipo con:
  - Foto circular
  - Nombre
  - Cargo/rol
- Estilo: fondo blanco, texto limpio

### 7. `app/components/NuestroTrabajo/` (NUEVO)
- Título: "Nuestro trabajo"
- Subtítulo: "Realizamos actividades semanales..."
- 3 tarjetas/columnas:
  1. Nutrición y autocuidado
  2. Actividades recreativas y educativas
  3. Apoyo psicosocial
- Cada tarjeta con ícono, título y descripción
- Estilo: fondo lila claro

### 8. `app/components/Impacto/Impacto.tsx` + `.module.css`
- Reorganizar como grid de estadísticas con iconos
- 4 estadísticas principales: 438 kits, 17337 bonos, 88 actividades, 1016 gorros
- Estilo limpio sin glassmorphism

### 9. `app/components/Datos/Datos.tsx` + `.module.css`
- Mantener 8 estadísticas
- Estilo limpio: fondo blanco, bordes redondeados simples
- Colores: porcentajes en teal, labels en gris

### 10. `app/components/ComoApoyarnos/ComoApoyarnos.tsx` + `.module.css`
- 3 tarjetas: Material recreativo, Donación monetaria, Bonos de apoyo
- Botón "Haz click" + "Dona aquí"
- Estilo limpio sin glassmorphism

### 11. `app/components/Donaciones/` (NUEVO)
- Sección CTA: "¿Quieres hacer una donación?"
- Botón grande "HAZ CLICK AQUÍ"
- Enlace a Google Forms
- Fondo teal

### 12. `app/components/Empresa/Empresa.tsx` + `.module.css`
- Título: "Tu empresa puede hacer la diferencia"
- Subtítulo: "Beneficios para empresas"
- Lista de 4 beneficios
- Estilo limpio

### 13. `app/components/Galeria/Galeria.tsx` + `.module.css`
- Grid de 4x2 imágenes
- Sin glassmorphism
- Bordes redondeados simples

### 14. `app/components/Contacto/Contacto.tsx` + `.module.css`
- Título: "Contáctanos"
- 3 items: Correo, Instagram, PQRS
- Estilo limpio

### 15. `app/components/Footer/Footer.tsx` + `.module.css`
- Logo + nombre fundación
- NIT y ubicación
- Documentos legales y financieros
- Políticas
- Copyright
- Estilo: fondo teal oscuro

---

## Archivos a Eliminar
- `app/components/CotizacionModal/` (no es parte del sitio público)

---

## Orden de Implementación

1. Actualizar `globals.css` con nueva paleta
2. Crear componente `TopBar`
3. Modificar `Navbar` (estilo limpio)
4. Rediseñar `Hero` (layout dos columnas)
5. Crear `SobreNosotros`
6. Crear `NuestroTrabajo`
7. Rediseñar `Impacto`
8. Rediseñar `Datos`
9. Rediseñar `ComoApoyarnos`
10. Crear `Donaciones`
11. Rediseñar `Empresa`
12. Rediseñar `Galeria`
13. Rediseñar `Contacto`
14. Rediseñar `Footer`
15. Actualizar `page.tsx` con nuevo orden
16. Eliminar `CotizacionModal`
17. Verificar build y responsive
