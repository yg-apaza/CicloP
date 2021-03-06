/** Coleccion Token */

/*
 * Coleccion TTL especial, los datos insertados expiran en una hora (3600 s)
 */

db.tokens.ensureIndex({"fCreacion" : 1}, {expireAfterSeconds: 3600});

/** Listas de Chequeo */

/*
 * Toma y definición de requisitos:
 * 		1: Lista de chequeo de requisitos
 * Análisis y diseño
 * 		2: Lista de chequeo de Plan de testing
 * 		3: Lista de chequeo de artefactos de análisis y diseño
 * Codificación
 * 		4: Lista de chequeo de estándares de programación
 * 		5: Lista de chequeo de interfaces a nivel comportamental
 * Pruebas
 * 		6: Lista de chequeo de casos de prueba diseñados
 * 		7: Lista de chequeo de casos de prueba ejecutados y de reporte de errores
 * Implantación y mantenimiento
 * 		8: Lista de chequeo de instalación
 */

db.modelos.insert({
	etapa: 1,
	tipo: 1,
	nombre: "Lista de chequeo de requisitos",
	secciones: [
        {
	    	nombre: "Organización del documento",
	    	items: [
    	        {
    	        	nombre: "Las referencias internas entre requisitos son todas correctas.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "Los requisitos se han escrito a un nivel de detalle apropiado.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Los requisitos constituyen una base adecuada para el diseño.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Cada requisito tiene prioridad de implementación.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Se ha especificado el origen de cada requisito.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 1
    	        }
	        ]
	    },
	    {
	    	nombre: "Atributos de calidad",
	    	items: [
    	        {
    	        	nombre: "Se han especificado los requisitos de rendimiento cuantitativamente.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "Se han identificado las funciones cuyo tiempo de respuesta es crítico.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Se han especificado los aspectos de seguridad.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "Se han especificado otros atributos de calidad cuantitativamente.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 1
    	        }
	        ]
	    },
	    {
	    	nombre: "Completitud",
	    	items: [
    	        {
    	        	nombre: "Se han definido todas las interfaces externas, de hardware, de software y de comunicaciones.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "La especificación de requisitos del software contiene todas las necesidades del cliente.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Todos los requisitos que han requerido más información, se identificaron como pendiente y fueron posteriomente solucionados.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "Se ha identificado el comportamiento del sistema para todos los tipos de errores más frecuentes.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Se ha especificado lo que el sistema no hará.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 1
    	        }
	        ]
	    },
	    {
	    	nombre: "Corrección",
	    	items: [
    	        {
    	        	nombre: "Se han eliminado los requisitos que poseen conflicto con otros.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "Se han eliminado los requisitos duplicados.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "Cada requisito se ha especificado en un lenguaje claro, conciso y no ambiguo.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Cada requisito es verificable mediante prueba, demostración, revisión u otro análisis.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        },
    	        {
    	        	nombre: "Todos los requisitos están dentro del ámbito del proyecto.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 2
    	        },
    	        {
    	        	nombre: "Ningún requisito contiene errores de contenido o gramaticales.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 1
    	        },
    	        {
    	        	nombre: "Los requisitos son implementables.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 1
    	        },
    	        {
    	        	nombre: "Se han especificado los mensajes de errores posibles de manera clara.",
    	        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
    	        	ponderacion: 2
    	        }
	        ]
	    },
	    {
	    	nombre: "Trazabilidad",
	    	items: [
    	        {
    	        	nombre: "Cada requisito posee un identificador único.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 1
    	        },
    	        {
    	        	nombre: "Los requisitos son trazables a requisitos de más alto nivel.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 1
    	        }
	        ]
	    },
	    {
	    	nombre: "Otras características deseables",
	    	items: [
    	        {
    	        	nombre: "Se ha diferenciado entre requisitos propiamente dichos (objetivos), descripciones de dominio (realidades), requisitos de interfaz (conexión entorno - máquina) y especificaciones de diseño.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 1
    	        },
    	        {
    	        	nombre: "Se ha tenido en cuenta los estándares, las leyes aplicables y las imposiciones posibles de entidades certificadoras.",
    	        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
    	        	ponderacion: 3
    	        }
	        ]
	    },
	    
    ]
});



db.modelos.insert({
	etapa: 2,
	tipo: 2,
	nombre: "Lista de chequeo de Plan de testing",
	secciones: [
		{
			nombre: "Riesgos y contingencias",
			items: [
		        {
		        	nombre: "Los riesgos de personal están identificados.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Los riesgos de tecnología están identificados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Los riesgos de planificación están identificados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los riesgos de desarrollo están identificados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los riesgos de ejecución están identificados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los riesgos de requerimientos críticos están identificados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Plan de contingencia",
			items: [
		        {
		        	nombre: "Los riesgos de personal están considerados adecuadamente en el plan de contingencia.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Los riesgos de tecnología están considerados adecuadamente en el plan de contingencia.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Los riesgos de planificación están considerados adecuadamente en el plan de contingencia.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los riesgos de desarrollo están considerados adecuadamente en el plan de contingencia.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los riesgos de ejecución están considerados adecuadamente en el plan de contingencia.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los riesgos de requerimientos críticos están considerados adecuadamente en el plan de contingencia.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Tareas y planificación",
			items: [
		        {
		        	nombre: "Las tareas cubren la mayoría de los aspectos que deben ser testados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "La descripción de las tareas es completa.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las relaciones entre tareas son completas y consistentes.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las asignaciones de recursos y restricciones son adecuadas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "La planificación satisface todos los hitos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los caminos críticos están minimizados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Ítems a ser testeados o analizados",
			items: [
		        {
		        	nombre: "El plan incluye una referencia a la especificación por cada ítem.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "El plan incluye una referencia a los procedimientos de instalación por cada ítem, sólo si estos existen.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Enfoque de testeo y análisis",
			items: [
		        {
		        	nombre: "Las técnicas de testeo y análisis a ser aplicadas son de costo efectivo para los ítems de su tipo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las técnicas de testeo y análisis a ser aplicadas cubren las propiedades relevantes de forma efectiva.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "La descripción es suficientemente detallada para identificar las tareas importantes y estimar el tiempo y los recursos.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Criterios de paso/fallo",
			items: [
		        {
		        	nombre: "Los criterios claramente indican las condiciones de paso/fallo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los criterios son consistentes con estándares de calidad especificados en la estrategia de análisis y testeo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Criterios de suspensión/reanudación",
			items: [
		        {
		        	nombre: "Los criterios claramente indican las condiciones límite para suspender el testeo y análisis debido a los costos excesivos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los criterios claramente indican las condiciones para reanudar el testeo y análisis después de la suspensión y el rehacer.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		}
    ]
});



db.modelos.insert({
	etapa: 2,
	tipo: 3,
	nombre: "Lista de chequeo de artefactos de análisis y diseño",
	secciones: [
		{
			nombre: "Casos de uso",
			items: [
		        {
		        	nombre: "Describe una tarea del negocio que sirva a una meta del negocio.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Tiene definido el flujo normal y los flujos alternos con un nivel apropiado de detalle.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Tiene definido los actores o los casos de uso que hacen uso de él.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Tiene definido los requerimientos que satisface.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Está representado en el diagrama general de casos de uso.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Diagrama de clases",
			items: [
		        {
		        	nombre: "Las clases tienen nombres significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las clases tiene definidos los atributos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las clases tienen definidos los métodos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Las clases tiene definidos las responsabilidades.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los atributos tiene nombres significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los atributos tienen definido el tipo de dato.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los atributos tienen definido el tipo de visibilidad.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Los métodos tienen nombres significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los métodos tienen definidos los parámetros.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los métodos tienen definidos los tipos de retorno.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los métodos tienen definido el tipo de visibilidad.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Las relaciones entre clases son lógicas y correctas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Las relaciones entre clases tienen definida la multiplicidad.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Diagrama de secuencia",
			items: [
		        {
		        	nombre: "Indica el caso de uso y el escenario al que hace referencia.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Visualiza actores y claes involucradas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las interacciones se muestran de manera temporal.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Los métodos (tipo de retorno y parámetros) utilizados para el envío de mensajes están definidos en el diagrama de clases.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los actores tienen nombres significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los métodos tiene nombres significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Modelo de base de datos",
			items: [
		        {
		        	nombre: "Se utiliza una notación estándar para la denominación de tablas y campos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El diagrama se encuentra en la tercera forma normal según las reglas de normalización de bases de datos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Utilización de campos varchar (MAX) en vez de Text.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se utilizan solamente llaves numéricas.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Documentos entregables",
			items: [
		        {
		        	nombre: "Portada con logo de la empresa, nombre del cliente, etapa del proyecto, nombre del documento, fecha y versión.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Tabla para el control de las versiones del documento: fecha, autor, referencia a cambios.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Tabla de contenido.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Numeración de páginas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Ortografía revisada.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Metodología de diseño",
			items: [
		        {
		        	nombre: "Los documentos de requerimientos del sistema han sido usados para seleccionar una metodología del diseño.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Las entidades, entradas y salidas han sido derivadas de la estructura del software.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El diseño del sistema ha sido aprobado y se produjo una línea base para el mismo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se ha diseñado un modelo de datos físico basado en el modelo de datos lógico.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las interfaces de usuario han sido diseñadas en consulta con el usuario del sistema.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "El diseño de las actividades del sistema han sido revisadas con el jefe de proyecto periódicamente cada vez que era requerido.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los cambios en la línea base del diseño del sistema han sido gestionados y controlados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Un documento de diseño del sistema ha sido creado.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Arquitectura",
			items: [
		        {
		        	nombre: "La arquitectura del sistema incluye y especifica a detalle hardware, software, bases de datos y estructuras de comunicación de datos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se hizo un análisis de costo beneficio que es realizado para distintas alternativas de arquitectura del sistema y es usado para elaborar recomendaciones de arquitectura.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Validación",
			items: [
		        {
		        	nombre: "Los casos de uso han sido entendidos, revisados y analizados por el cliente.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los casos de uso han tenido correciones debido a las observaciones del cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El diagrama de clases ha sido entendido, revisado y analizado por el cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El diagrama de clases ha tenido correcciones debido a las observaciones del cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El diagrama de secuencia ha sido entendido, revisado y analizado por el cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El diagrama de secuencia ha tenido correcciones debido a las observaciones del cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El modelo de base de datos ha sido entendido, revisado y analizado por el cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El modelo de base de datos ha tenido correcciones debido a las observaciones del cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		}
    ]
});



db.modelos.insert({
	etapa: 3,
	tipo: 4,
	nombre: "Lista de chequeo de estándares de programación",
	secciones: [
		{
			nombre: "Código en general",
			items: [
		        {
		        	nombre: "El código está indentado.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se hace uso continuo de las llaves.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se ha manejado un orden para las variables, constantes y cursores.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se ha definido una sola variable por línea.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "El nombre de los files, scripts y clases contiene un verbo que indica para qué sirven.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las sentencias se han limitado a una por línea.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se ha evitado el uso de sentencias anidadas.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se ha descrito los errores de manera significativa.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se verifica la entrada de datos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se ha hecho uso de asserts.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se realiza manejo de errores ante entradas incorrectas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Documentación",
			items: [
		        {
		        	nombre: "La documentación de una línea de código está en una línea diferente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "La documentación de funciones incluye la especificación de lo que hace, los parámetros de entrada y los posibles parámetros de salida.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Parámetros",
			items: [
		        {
		        	nombre: "El nombre de los parámetros siguen una notación estándar y son significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Constantes",
			items: [
		        {
		        	nombre: "El nombre de las constantes siguen una notación estandar y son significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las constantes se ha ndeclarado en la cabecera del archivo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Variables",
			items: [
		        {
		        	nombre: "El nombre de las variables siguen una notación estándar y son significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El nombre de las variables no son conflictivos con el nombre de funciones de librerías estándares.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Las variables globables se han usado con moderación.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Las variables estáticas han sido inicializadas al ser declaradas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Cursores",
			items: [
		        {
		        	nombre: "El nombre de los cursores siguen una notación estándar y son significativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Punteros y memoria dinámica",
			items: [
		        {
		        	nombre: "La memoria que ha sido asignada dinámicamente se desasigna cuando ya no es necesaria.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Funciones",
			items: [
		        {
		        	nombre: "El nombre de las funciones sigue una notación estándar y es significativo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los prototipos de las funciones son declaradas al inicio del archivo y se incluyen en los módulos que las llaman.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Los argumentos especificados en la definición de la función tienen el mismo nombre en el prototipo declarado.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Portabilidad",
			items: [
		        {
		        	nombre: "El código es portable.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		}
    ]
});



db.modelos.insert({
	etapa: 3,
	tipo: 5,
	nombre: "Lista de chequeo de interfaces a nivel comportamental",
	secciones: [
		{
			nombre: "Organización y distribución",
			items: [
		        {
		        	nombre: "Se distribuye la información según estereotipos.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "La información relacionada está agrupada.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El número de zonas sensibles es menor que 8.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Color",
			items: [
		        {
		        	nombre: "El color es usado funcionalmente (resaltar, agruptar, informar).",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Su función es reforzada por otros recursos comunicativos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se utiliza de acuerdo a connotaciones culturales y estereotipos.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "EL contraste figura-fondo permite legibilidad y evita cansancio visual.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Texto",
			items: [
		        {
		        	nombre: "Su tamaño mínimo es legible en las condiciones habituales de uso.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se utilizan recursos distintos a cursiva o negrita para jerarquizar información.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Existe un contraste en las tipografías utilizadas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se evita usar más de 2 tipografías, 3 si es inevitable.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se evita combinar tipografías de diferentes épocas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se combina fuentes de estilos y eras diferentes.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Combinar diferentes grosores de la misma familia.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Información del estado del sistema",
			items: [
		        {
		        	nombre: "Hay indicadores del normal funcionamiento del sistema.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "El sistema indica cuando un procedimiento o secuencia se ha completado.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El sistema indica cuando un proceso demora más de lo habitual.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Íconos",
			items: [
		        {
		        	nombre: "La metáfora elegida se asocia al mensaje.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los recursos gráficos elegidos logran transmitir el mensaje.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "El signo es visible y legible.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los íconos están formalmente coordinados en un sistema.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "La redundancia verbal refuerza al mensaje.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Punteros",
			items: [
		        {
		        	nombre: "Se utiliza el puntero para proporcionar feedback.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "El 'Hot Spot' del puntero es intuitivo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "El puntero no dificulta la visibilidad de los demás elementos de la interfaz.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Logos",
			items: [
		        {
		        	nombre: "El logo es sencillo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se evita utilizar colores planos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se evita usar imágenes rasterizadas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El logo es escalable.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se evita usar demasiados colores.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se usan pocas fuentes para no romper el encanto.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se evita usar líneas exteriores.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se evita escribir dentro del código.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se evita poner el logo dentro de una caja.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Carga mental del usuario",
			items: [
		        {
		        	nombre: "Si se ingresan códigos, estos tienen más de 5 caracteres.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Si se ingresan códigos más largos, estos se particionan.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "El sistema no diferencia entre mayúsculas y minúsculas.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Flexibilidad y eficiencia de uso",
			items: [
		        {
		        	nombre: "El ingreso no require de doble tecleo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "El pasaje de un campo a otro es automático.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Si la entrada de datos incluye una unidad, esta incorporará la etiqueta.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Hay una entrada por defecto para los campos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Si hay entrada por defecto, se permite cambiarla si es necesario.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "El cursor se ubica en el lugar necesario para iniciar la carga.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Se puede realizar la carga en cualquier orden.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		},
		{
			nombre: "Prevención de errores",
			items: [
		        {
		        	nombre: "Se require confirmación del usuario antes de una acción destructiva.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se advierte a los usuarios de las posibles consecuencias de una acción destructiva.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Las acciones potencialmente destructivas se realizan en más de un paso.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Hay mecanismos de validación de entradas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Reconocimiento, diagnóstico y recuperación de errores",
			items: [
		        {
		        	nombre: "El usuario dispone de la función DESHACER.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los mensajes de error comienzan indicando cuál es el error y cómo pueden solucionarse.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los mensajes de error tienen dos niveles, uno para el usuario y otro opcional más detallado.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Hay mecanismo de corrección para los datos más frecuentemente erróneos.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "General",
			items: [
		        {
		        	nombre: "El sistema incorpora documentación de ayuda.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "La ayuda se invoca según estándares.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se puede acceder al sistema de ayuda en cualquier momento.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "La ayuda está dividida en al menos dos niveles de complejidad.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se incorpora en la ayuda un listado de errores junto a una explicación.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Redacción clara y concisa",
			items: [
		        {
		        	nombre: "La idea de oración está al comienzo de la misma.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Las oraciones son cortas y de estructura simple.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las oraciones son afirmativas en lugar de negativas. Se evita la voz pasiva.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Presentación de la información",
			items: [
		        {
		        	nombre: "El uso del color es consistente.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "La distribución de la información es consistente.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Hay consistencia entre la aplicación y el sistema operativo.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Interacción",
			items: [
		        {
		        	nombre: "Hay relación entre lo esperado por el usuario y los resultados de las acciones.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "El comportamiento de los elementos de la interfaz es consistente.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		}
    ]
});



db.modelos.insert({
	etapa: 4,
	tipo: 6,
	nombre: "Lista de chequeo de casos de prueba diseñados",
	secciones: [
		{
			nombre: "Calidad",
			items: [
		        {
		        	nombre: "Correcto. Es apropiado para los probadores y el entorno.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Exacto. Su descripción se puede probar.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Económico. Tiene solo los pasos o campos para su propósito.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        },
		        {
		        	nombre: "Confiable y repetible. Se obtiene el mismo resultado sin importar que se pruebe.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Rastreable. Se sabe que requisito se prueba.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Medible. Retorna al estado de la prueba sin valores en su estado.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Estructura de capacidad y prueba",
			items: [
		        {
		        	nombre: "Tiene nombre y número.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Tiene un propósito declarado que incluye que requisito se está probando.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Tiene una descripción del método de prueba.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Especifica la información de configuración, entorno, datos, pre-requisitos de prueba, seguridad.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Tiene acciones y resultados esperados.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Guarda el estado de las pruebas, como informes o captura de pantalla.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Mantiene el entorno de pruebas limpio.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "No supera los 15 pasos.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Administración de la configuración",
			items: [
		        {
		        	nombre: "Emplea convenciones de nomenclatura y numeración.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Guarda en formatos específicos los tipos de archivo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Su versión coincide con el software bajo prueba.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Incluye objetos de prueba necesarios para el caso, tales como base de datos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Almacena con acceso controlado.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Realiza copias de seguridad en red.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Archiva por fuera del sitio.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		}
    ]
});


db.modelos.insert({
	etapa: 4,
	tipo: 7,
	nombre: "Lista de chequeo de casos de prueba ejecutados y de reporte de errores",
	secciones: [
		{
			nombre: "Lista de chequeo de casos de prueba ejecutados",
			items: [
		        {
		        	nombre: "Los resultados actuales han sido ejecutados para cada uno de los pasos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "El resultado actual ha sido documentado para un paso fallido y para sus subsecuentes re-ejecuciones.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Todos los pasos han sido ejecutados satisfactoriamente.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los detalles de los defectos como id, descripción, entre otros han sido dados para un paso fallido.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las razones del fallo han sido almacenadas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Un punto recrea el defecto antes de loguearse en la base de datos de defectos. Además estos detalles han sido documentados.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Los defectos han sido re-ejecutados y los detalles del re-testeo y los resultados han sido documentados con la fecha de cuando fueron ejecutados.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Los resultados de diferentes entornos han sido almacenados.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Las métricas relacionadas a los casos de prueba han sido actualizadas en todos los documentos de métricas aplicables.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		},
		{
			nombre: "Reportes de errores",
			items: [
		        {
		        	nombre: "Se ha asignado un número único identificativo al error que permita realizar un claro seguimiento de su resolución.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se describe paso a paso cómo producir el error además de los datos relevantes introducidos.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se ha hecho uso de una plantilla para describir las incidencias de cada error.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se ha especificado la versión del producto en donde se encontró el error.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se ha especificado las características técnicas de la ejecución donde se encontró el error.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se mantiene una tabla del estado del error.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se han indicado los datos del encargado.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 1
		        }
		    ]
		}
    ]
});


db.modelos.insert({
	etapa: 5,
	tipo: 8,
	nombre: "Lista de chequeo de instalación",
	secciones: [
		{
			nombre: "Implantación del sistema",
			items: [
		        {
		        	nombre: "El sistema puede gestionar todos los volúmenes de información requeridos u se ajusta a los tiempo de respuesta deseados.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Luego de la implantación es necesario realizar los mínimos cambios por insatisfacción del cliente.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "El sistema se ajusta a las necesidades del cliente.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se hizo una planificación para la implantación del sistema.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se desarrollaron documentos donde se defina de forma detallada el plan de implantación.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se tiene un equipo de implantación para el desarrollo del mismo.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se hizo una preparación para la formación del equipo de implantación.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Para la formación del equipo de trabajo se usó alguna de las 2 actividades siguientes, sesión de trabajo o catalogación.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Hubo una mínima cantidad de incidentes en la preparación de implantación.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se elaboró un informe de los problemas presentados en las pruebas de implantación.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se realizaron pruebas de aceptación del sistema.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Participa el jefe del proyecto en las pruebas de aceptación del sistema.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "No se necesitan herramientas para la implantación del sistema.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        }
		    ]
		},
		{
			nombre: "Mantenimiento del sistema",
			items: [
		        {
		        	nombre: "Se formó un equipo de trabajo para el mantenimiento del sistema.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se tiene la documentación necesaria para la definición del mantenimiento del sistema.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "El equipo de trabajo se encuentra familiarizado con el sistema.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se realizaron las pruebas de mantenimiento.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "Se han llevado a cabo todos los casos de prueba descritos en el plan de pruebas.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "Se realizó una evaluación de los resultados de las pruebas de mantenimiento.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 3
		        },
		        {
		        	nombre: "El jefe del proyecto participa en las tareas para el mantenimiento del sistema.",
		        	obligatoriedad: false,
    	        	seleccionado: false,
    	        	estado: false,
		        	ponderacion: 2
		        },
		        {
		        	nombre: "No existieron complicaciones en la definición de los documentos para la planificación del mantenimiento del sistema.",
		        	obligatoriedad: true,
    	        	seleccionado: true,
    	        	estado: false,
		        	ponderacion: 3
		        }
		    ]
		}
    ]
});